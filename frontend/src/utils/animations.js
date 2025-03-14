import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Asegurarse de que gsap registre el plugin ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export const initAnimations = () => {
  if (typeof window === "undefined") return

  // Animación de la barra de navegación
  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      gsap.to(".pags a.ff-00", { color: "#fff", duration: 1 })
    } else {
      gsap.to(".pags a.ff-00", { color: "#000", duration: 1 })
    }
  })

  if (window.innerWidth >= 1280) {
    gsap.fromTo(
      ".nav-bar-bg",
      { y: -112 }, // Comienza fuera de la vista
      {
        backgroundColor: "#0C5B2B", // Cambia el color de fondo al color sólido
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=100", // Ajusta según necesites
          scrub: true,
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(".nav-bar-bg", { y: 0, backgroundColor: "#0C5B2B", duration: 0.5 })
            gsap.to(".pags a", { color: "#fff", duration: 1 })
          },
          onLeaveBack: () => {
            gsap.to(".nav-bar-bg", { y: -112, backgroundColor: "transparent", duration: 0.5 })
            // No cambiar el color de nuevo a negro
          },
        },
      },
    )
  } else {
    gsap.to(".nav-bar-bg", { y: 0, backgroundColor: "#0C5B2B" }) // Mantener la barra fija
    gsap.to(".pags a", { color: "#fff", duration: 1 })
  }

  // Animación de la sección de servicios
  gsap.fromTo(
    ".fondo-carruzel",
    {
      xPercent: 100,
    },
    {
      xPercent: 0,
      scrollTrigger: {
        trigger: ".nuestros",
        start: "top center",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )

  // Animaciones de la sección "Sobre nosotros"
  gsap.fromTo(
    ".img-s1",
    {
      xPercent: -25,
      opacity: 0,
    },
    {
      duration: 0.55,
      xPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".img-s",
        start: "top 85%",
        end: "center 80%",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".img-s2",
    {
      yPercent: 100,
      opacity: 0,
    },
    {
      duration: 0.7,
      yPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".img-s",
        start: "top 70%",
        end: "center 80%",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".img-s3",
    {
      xPercent: -30,
      opacity: 0,
    },
    {
      duration: 0.5,
      xPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".img-s",
        start: "top 65%",
        end: "center 80%",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".text-s",
    {
      yPercent: 50,
      opacity: 0,
    },
    {
      duration: 1,
      yPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".img-s",
        start: "top 60%",
        end: "center 80%",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".text-s-responsive",
    {
      yPercent: 50,
      opacity: 0,
    },
    {
      duration: 1,
      yPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".img-s",
        start: "top 60%",
        end: "center 80%",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".text-s-responsive-tablet",
    {
      yPercent: 50,
      opacity: 0,
    },
    {
      duration: 1,
      yPercent: 0,
      opacity: 1,
      scrollTrigger: {
        trigger: ".img-s",
        start: "top 60%",
        end: "center 80%",
        toggleActions: "play none none reverse",
      },
    },
  )

  // Animaciones de la sección "Por qué elegirnos"
  gsap.fromTo(
    ".fondo",
    {
      xPercent: -100,
    },
    {
      xPercent: 0,
      scrollTrigger: {
        trigger: ".pq-elegirnos",
        start: "top center",
        end: "end",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".c1",
    {
      opacity: 0,
      filter: "blur(5px)",
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      scrollTrigger: {
        trigger: ".c1",
        start: "top 60%",
        end: "+=50%",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".c2",
    {
      opacity: 0,
      filter: "blur(5px)",
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      scrollTrigger: {
        trigger: ".c2",
        start: "top 55%",
        end: "+=30%",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".c3",
    {
      opacity: 0,
      filter: "blur(5px)",
    },
    {
      opacity: 1,
      filter: "blur(0px)",
      scrollTrigger: {
        trigger: ".c3",
        start: "top 50%",
        end: "+=10%",
        toggleActions: "play none none reverse",
      },
    },
  )

  // Animaciones de la sección de ubicación
  gsap.fromTo(
    ".maps",
    {
      yPercent: 100,
    },
    {
      yPercent: 0,
      scrollTrigger: {
        trigger: ".h4-ubi",
        start: "top center",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".h4-u",
    {
      opacity: 0,
      yPercent: 100,
    },
    {
      opacity: 1,
      yPercent: 0,
      scrollTrigger: {
        trigger: ".h4-ubi",
        start: "top center",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )

  // Animaciones para la versión tablet
  if (window.innerWidth > 800) {
    gsap.fromTo(
      ".card-nuestros-res1",
      {
        opacity: 0,
        xPercent: -100,
      },
      {
        opacity: 1,
        xPercent: 0,
        scrollTrigger: {
          trigger: ".nuestros-sec",
          start: "center 80%",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      ".card-nuestros-res2",
      {
        opacity: 0,
        xPercent: 100,
      },
      {
        opacity: 1,
        xPercent: 0,
        scrollTrigger: {
          trigger: ".nuestros-sec",
          start: "center 100%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      ".card-nuestros-res3",
      {
        opacity: 0,
        xPercent: -100,
      },
      {
        opacity: 1,
        xPercent: 0,
        scrollTrigger: {
          trigger: ".nuestros-sec",
          start: "top center",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      },
    )

    gsap.fromTo(
      ".card-nuestros-res4",
      {
        opacity: 0,
        xPercent: 100,
      },
      {
        opacity: 1,
        xPercent: 0,
        scrollTrigger: {
          trigger: ".nuestros-sec",
          start: "top center",
          end: "bottom top",
          toggleActions: "play none none reverse",
        },
      },
    )
  }

  // Animaciones para la versión móvil
  gsap.fromTo(
    ".fondo-ns-tlf-1",
    {
      opacity: 0,
      xPercent: 100,
    },
    {
      opacity: 1,
      xPercent: 0,
      scrollTrigger: {
        trigger: ".nuestros-responsive-tlf",
        start: "center 150%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".fondo-ns-tlf-2",
    {
      opacity: 0,
      xPercent: -100,
    },
    {
      opacity: 1,
      xPercent: 0,
      scrollTrigger: {
        trigger: ".nuestros-responsive-tlf",
        start: "center 120%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".fondo-ns-tlf-3",
    {
      opacity: 0,
      xPercent: 100,
    },
    {
      opacity: 1,
      xPercent: 0,
      scrollTrigger: {
        trigger: ".nuestros-responsive-tlf",
        start: "center 90%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".fondo-ns-tlf-4",
    {
      opacity: 0,
      xPercent: -100,
    },
    {
      opacity: 1,
      xPercent: 0,
      scrollTrigger: {
        trigger: ".nuestros-responsive-tlf",
        start: "center 60%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".img-tlf-1",
    {
      opacity: 0,
      xPercent: -100,
    },
    {
      opacity: 1,
      xPercent: 0,
      scrollTrigger: {
        trigger: ".pq-elegirnos",
        start: "center 120%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".img-tlf-2",
    {
      opacity: 0,
      xPercent: -100,
    },
    {
      opacity: 1,
      xPercent: 0,
      scrollTrigger: {
        trigger: ".pq-elegirnos",
        start: "center 100%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )

  gsap.fromTo(
    ".img-tlf-3",
    {
      opacity: 0,
      xPercent: -100,
    },
    {
      opacity: 1,
      xPercent: 0,
      scrollTrigger: {
        trigger: ".pq-elegirnos",
        start: "center 80%",
        end: "bottom top",
        toggleActions: "play none none reverse",
      },
    },
  )
}

// Función para animar los slides de servicios
export const animateServiceSlides = () => {
  if (typeof window === "undefined") return

  const slides = document.querySelectorAll(".service-card")
  let currentIndex = 0

  function showNextSlide() {
    const currentSlide = slides[currentIndex]
    currentIndex = (currentIndex + 1) % slides.length
    const nextSlide = slides[currentIndex]

    gsap.fromTo(nextSlide, { x: "100%" }, { x: "0%", duration: 0.5, onStart: () => nextSlide.classList.add("active") })
    gsap.to(currentSlide, { x: "-100%", duration: 0.5, onComplete: () => currentSlide.classList.remove("active") })
  }

  function showPrevSlide() {
    const currentSlide = slides[currentIndex]
    currentIndex = (currentIndex - 1 + slides.length) % slides.length
    const prevSlide = slides[currentIndex]

    gsap.fromTo(prevSlide, { x: "-100%" }, { x: "0%", duration: 0.5, onStart: () => prevSlide.classList.add("active") })
    gsap.to(currentSlide, { x: "100%", duration: 0.5, onComplete: () => currentSlide.classList.remove("active") })
  }

  // Exponer las funciones para usarlas desde los componentes
  return {
    showNextSlide,
    showPrevSlide,
  }
}

// Función para crear ScrollTriggers responsivos
export const createResponsiveTriggers = () => {
  if (typeof window === "undefined") return

  function createScrollTrigger(element, start, end) {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        filter: "blur(5px)",
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          toggleActions: "play none none reverse",
        },
      },
    )
  }

  function setResponsiveTriggers() {
    const windowHeight = window.innerHeight

    // Ajusta los valores según la altura de la ventana
    if (windowHeight <= 900) {
      createScrollTrigger(".c1", "top 60%", "+=80%")
      createScrollTrigger(".c2", "top 55%", "+=60%")
      createScrollTrigger(".c3", "top 10%", "+=10%")
    } else {
      createScrollTrigger(".c1", "top 60%", "+=50%")
      createScrollTrigger(".c2", "top 55%", "+=30%")
      createScrollTrigger(".c3", "top 10%", "+=10%")
    }
  }

  // Inicializa los triggers
  setResponsiveTriggers()

  // Reajusta los triggers cuando la ventana cambie de tamaño
  window.addEventListener("resize", setResponsiveTriggers)

  // Retornar función de limpieza para React
  return () => {
    window.removeEventListener("resize", setResponsiveTriggers)
  }
}

// Función para limpiar todas las animaciones
export const cleanupAnimations = () => {
  if (typeof window === "undefined") return

  // Limpiar todos los ScrollTriggers
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

  // Limpiar todas las animaciones GSAP
  gsap.killTweensOf("*")
}

