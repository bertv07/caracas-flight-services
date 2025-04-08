"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function AnimatedTimeline({ items = [] }) {
  const timelineRef = useRef(null)
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const dotsRef = useRef([])
  const contentsRef = useRef([])
  const [activeIndex, setActiveIndex] = useState(null)

  useEffect(() => {
    if (!timelineRef.current || !pathRef.current) return

    const path = pathRef.current
    const pathLength = path.getTotalLength()
    const totalItems = items.length

    // Configuración inicial
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    })

    // Set initial state for dots
    dotsRef.current.forEach((dot) => {
      if (dot) gsap.set(dot, { opacity: 0, scale: 0 })
    })

    // Animación principal del path sincronizada
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top bottom",
        end: "bottom center",
        scrub: 0.5,
        markers: false,
      },
    })

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power2.inOut",
    })

    // Animación sincronizada de elementos
    items.forEach((_, index) => {
      const progress = index / (totalItems - 1)

      // Enhanced dot animation with rotation and elastic effect
      tl.to(
        dotsRef.current[index],
        {
          scale: 1,
          opacity: 1,
          rotation: 360,
          ease: "elastic.out(1.2, 0.5)",
          duration: 0.5,
          onComplete: () => {
            // Add a subtle pulse animation after appearing
            gsap.to(dotsRef.current[index], {
              boxShadow: "0 0 0 4px white, 0 0 15px 6px rgba(0, 128, 0, 0.5)",
              repeat: 1,
              yoyo: true,
              duration: 0.8,
            })
          },
        },
        progress * 0.8,
      )

      tl.to(
        contentsRef.current[index],
        {
          opacity: 1,
          y: 0,
          ease: "power4.out",
          duration: 0.5,
        },
        progress * 0.8 + 0.1,
      )
    })

    // Actualización en tiempo real de la posición
    ScrollTrigger.create({
      trigger: timelineRef.current,
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const currentProgress = self.progress * totalItems
        const currentIndex = Math.floor(currentProgress)

        // Update active index for styling
        setActiveIndex(currentIndex)

        items.forEach((_, index) => {
          const elementProgress = currentProgress - index
          const yOffset = gsap.utils.mapRange(0, 1, 30, 0)(elementProgress)

          if (contentsRef.current[index]) {
            gsap.set(contentsRef.current[index], {
              y: yOffset,
              opacity: gsap.utils.clamp(0, 1, elementProgress * 3),
            })
          }

          // Add bounce effect to the active dot
          if (index === currentIndex) {
            gsap.to(dotsRef.current[index], {
              scale: 1.2,
              duration: 0.3,
              opacity: 1,
              boxShadow: "0 0 0 4px white, 0 0 15px 6px rgba(0, 128, 0, 0.5)",
              ease: "none",
              overwrite: false,
            })
          } else if (dotsRef.current[index]) {
            // For dots that have already been activated (before current position)
            if (index < currentIndex) {
              gsap.to(dotsRef.current[index], {
                scale: 1,
                opacity: 1,
                duration: 0.3,
                boxShadow: "0 0 0 4px white, 0 0 0 6px rgba(0, 128, 0, 0.3)",
                ease: "power2.out",
                overwrite: true,
              })
            }
            // For dots that haven't been activated yet (after current position)
            else if (index > currentIndex) {
              gsap.to(dotsRef.current[index], {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                boxShadow: "0 0 0 4px white, 0 0 0 6px rgba(0, 128, 0, 0.3)",
                ease: "power2.out",
                overwrite: true,
              })
            }
          }
        })
      },
    })

    // Set up hover animations for the dots
    dotsRef.current.forEach((dot) => {
      if (!dot) return

      dot.addEventListener("mouseleave", () => {
        // Reset the year label
        const yearLabel = dot.querySelector(".timeline-year")
        if (yearLabel) {
          gsap.to(yearLabel, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.in",
          })
        }
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      dotsRef.current.forEach((dot) => {
        if (dot) {
          dot.removeEventListener("mouseenter", () => {})
          dot.removeEventListener("mouseleave", () => {})
        }
      })
    }
  }, [items])

  return (
    <div ref={timelineRef} className="animated-timeline">
      <div className="timeline-container">
        <svg ref={svgRef} className="timeline-svg" viewBox="0 0 400 1000">
          <path
            ref={pathRef}
            className="timeline-path"
            d="M200,100 C100,200 300,300 200,400 C100,500 300,600 200,700 C100,800 200,900 200,900"
            fill="none"
            stroke="var(--color-green)"
            strokeWidth="4"
          />
        </svg>

        {items.map((item, index) => {
          const yPosition = (index / (items.length - 1)) * 90 + 5

          return (
            <div key={index} className="timeline-item-wrapper">
              <div
                ref={(el) => (dotsRef.current[index] = el)}
                className={`timeline-dot ${activeIndex === index ? "active" : ""} timeline-dot-${index}`}
                style={{ "--dot-position": `${yPosition}%` }}
              >
                <div className="timeline-year">{item.year}</div>
              </div>

              <div
                ref={(el) => (contentsRef.current[index] = el)}
                className={`timeline-content timeline-content-${index}`}
                style={{
                  "--content-side": index % 2 === 0 ? 1 : -1,
                  "--vertical-position": `${yPosition}%`,
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

