"use client"
import { useEffect, useRef } from "react"
import BarraNavegacion from "../components/barra-navegacion"
import NavBar from "../components/auth/navBarAuth"
import { isAuthenticated } from "../utils/authUtils"
import SobreNosotrosAlt from "../components/SobreNosotrosAlt"
import NuestroCompromiso from "../components/NuestroCompromiso"
import AnimatedTimeline from "../components/animated-timeline"
import "../styles/acercade.css"
import "../styles/animated-timeline.css"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

export default function AcercaDePage() {
  const containerRef = useRef()
  const equipoRef = useRef()
  const certificacionesRef = useRef()

  // Datos de la línea de tiempo
  const timelineItems = [
    {
      year: "2010",
      title: "Fundación",
      description:
        "Caracas Flight Services fue fundada por un grupo de profesionales de la aviación con la visión de mejorar los servicios aeronáuticos en Venezuela.",
    },
    {
      year: "2012",
      title: "Primer FBO Certificado",
      description:
        "Nos convertimos en el primer FBO certificado en Venezuela, estableciendo nuevos estándares de calidad en la industria.",
    },
    {
      year: "2015",
      title: "Expansión de Servicios",
      description:
        "Ampliamos nuestra cartera de servicios para incluir manejo de equipaje, catering, y coordinación de permisos internacionales.",
    },
    {
      year: "2018",
      title: "Renovación de Instalaciones",
      description: "Modernizamos nuestras instalaciones para ofrecer mayor comodidad y eficiencia a nuestros clientes.",
    },
    {
      year: "2020",
      title: "Certificación Internacional",
      description: "Obtuvimos certificaciones internacionales que avalan la calidad de nuestros servicios y procesos.",
    },
    {
      year: "Hoy",
      title: "Líderes en el Mercado",
      description:
        "Actualmente somos líderes en el mercado de servicios aeronáuticos en Venezuela, con planes de expansión regional.",
    },
  ]

  useEffect(() => {
    // Controlar el overflow para evitar scrollbars extras
    document.body.style.overflowX = "hidden"

    // Esperar a que el DOM esté completamente listo
    const timer = setTimeout(() => {
      // Configuración global de GSAP
      gsap.defaults({
        overwrite: "auto",
        duration: 1.2,
      })

      // 1. ANIMACIÓN PARA MISIÓN Y VISIÓN
      gsap.utils.toArray([".mision", ".vision"]).forEach((element, index) => {
        gsap.from(element, {
          opacity: 0,
          x: index % 2 === 0 ? -150 : 150,
          scrollTrigger: {
            trigger: element,
            start: "top bottom-=100",
            end: "center center",
            toggleActions: "play none none reverse",
            markers: false,
          },
        })
      })

      // 3. ANIMACIÓN PARA VALORES
      gsap.from(".valor-item", {
        opacity: 0,
        rotationY: 15,
        stagger: {
          each: 0.2,
        },
        scrollTrigger: {
          trigger: ".valores-grid",
          start: "top center+=150",
          toggleActions: "play none none reverse",
        },
      })

      // 4. ANIMACIÓN DE ENTRADA GENERAL
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          ScrollTrigger.refresh() // Recargar ScrollTrigger después de la animación inicial
        },
      })

      // 5. ANIMACIÓN PARA MIEMBROS DEL EQUIPO
      // Animación para mq1 (desde la izquierda)
      gsap.from(".mq1", {
        opacity: 0,
        x: -150,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".equipo-grid",
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })

      // Animación para mq2 (desde la derecha)
      gsap.from(".mq2", {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".equipo-grid",
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })

      // Animación para mq3 (desde la izquierda)
      gsap.from(".mq3", {
        opacity: 0,
        x: 100,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".equipo-grid",
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })

      // Animación para mq4 (desde la derecha)
      gsap.from(".mq4", {
        opacity: 0,
        x: 150,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".equipo-grid",
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })

      // 6. ANIMACIÓN PARA CERTIFICACIONES (desde abajo)
      gsap.from(".certificaciones-container", {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".certificaciones",
          start: "top bottom-=100",
          toggleActions: "play none none reverse",
        },
      })

      // Animación para cada certificación con stagger
      gsap.from(".certificacion-item", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".certificaciones-grid",
          start: "top bottom-=50",
          toggleActions: "play none none reverse",
        },
      })
    }, 300) // Pequeño delay para asegurar que el DOM está listo

    // Limpieza
    return () => {
      clearTimeout(timer)
      ScrollTrigger.killAll()
      gsap.killTweensOf("*")
    }
  }, [])

  return (
    <div className="acercade-page" ref={containerRef}>
      <NavBar />

      {/* Reutilizamos el componente SobreNosotrosAlt */}
      <SobreNosotrosAlt />

      <div className="acercade-container">
        <div className="mision-vision">
          <div className="mision">
            <h2>Nuestra Misión</h2>
            <p>
              Proporcionar servicios aeronáuticos de la más alta calidad, garantizando la seguridad, eficiencia y
              satisfacción de nuestros clientes. Nos comprometemos a ofrecer soluciones integrales que faciliten las
              operaciones aéreas, cumpliendo con los más altos estándares internacionales y contribuyendo al desarrollo
              de la aviación civil en Venezuela.
            </p>
          </div>

          <div className="vision">
            <h2>Nuestra Visión</h2>
            <p>
              Ser reconocidos como el proveedor líder de servicios aeronáuticos en Venezuela y la región,
              distinguiéndonos por nuestra excelencia operativa, innovación constante y compromiso con la seguridad.
              Aspiramos a expandir nuestras operaciones y servicios, estableciendo nuevos estándares de calidad en la
              industria aeronáutica.
            </p>
          </div>
        </div>

        <div className="valores">
          <h2>Nuestros Valores</h2>
          <div className="valores-grid">
            <div className="valor-item">
              <div className="valor-icono">
              <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#ffffff"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M20.91 11.12C20.91 16.01 17.36 20.59 12.51 21.93C12.18 22.02 11.82 22.02 11.49 21.93C6.63996 20.59 3.08997 16.01 3.08997 11.12V6.72997C3.08997 5.90997 3.70998 4.97998 4.47998 4.66998L10.05 2.39001C11.3 1.88001 12.71 1.88001 13.96 2.39001L19.53 4.66998C20.29 4.97998 20.92 5.90997 20.92 6.72997L20.91 11.12Z"
        stroke="#ffffff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>

              </div>
              <h3>Seguridad</h3>
              <p>La seguridad es nuestra prioridad absoluta en todas las operaciones que realizamos.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
                <svg fill="#ffffff" viewBox="0 0 256 256" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M174,175.3c0.8,0.3,2.1,0.7,3.6,0.6c2.4-0.1,4.6-1.1,6.2-2.7c1.8-1.8,2.7-4.2,2.7-6.7c-0.2-15.1,9.4-28.3,23.7-32.8 c1-0.3,2-0.8,2.9-1.5c2-1.5,3.3-3.7,3.6-6c0.4-2.5-0.2-5-1.7-7.1c-9-12.1-9.1-28.4-0.1-40.5l1.1-1.4l0.5-1.5c0.8-2.4,0.5-5-0.6-7 c-1.1-2.3-3.1-4-5.5-4.7c-14.3-4.6-23.9-17.7-23.7-32.7c0-1.2-0.2-2.2-0.5-3.2c-0.8-2.3-2.5-4.2-4.8-5.4c-2.2-1-4.7-1.2-7-0.4 c-3.5,1.2-7.2,1.8-10.9,1.8c-11,0-21.4-5.3-27.7-14.3c-0.7-0.9-1.5-1.7-2.2-2.2c-4.2-3-10-2-13,2.2c-6.4,9-16.7,14.3-27.7,14.3 c-3.8,0-7.4-0.6-10.8-1.8c-3.2-1.1-7.3-0.3-9.7,2.2c-1.8,1.8-2.7,4.2-2.7,6.6c0.2,15.1-9.4,28.3-23.7,32.7c-1.1,0.3-2,0.8-3,1.5 c-4.1,3.1-4.9,8.9-1.9,13.1c9,12.1,9,28.4,0,40.6c-0.6,0.8-1.1,1.8-1.4,2.7c-0.7,2.4-0.5,4.8,0.6,7.2c1.2,2.2,3.2,3.8,5.4,4.5 c14.4,4.6,23.9,17.8,23.7,32.6c-0.1,1.2,0.1,2.3,0.5,3.4c0.8,2.3,2.5,4.2,4.8,5.4c2.3,1,4.7,1.2,7,0.4c3.6-1.2,7.4-1.8,11.1-1.8 c11.1,0,21.1,5.2,27.6,14.3c0.6,0.8,1.4,1.6,2.2,2.2c1.6,1.1,3.5,1.7,5.4,1.7c0.5,0,1.1,0,1.6-0.1c2.5-0.4,4.6-1.8,6-3.8 C144.3,175.6,159.7,170.5,174,175.3z M127.9,181.7c-8.2-11.3-21.3-18-35.2-18c-4.6,0-9.3,0.7-13.6,2.2c0-19-12.1-35.7-30-41.4 c11.2-15.4,11.2-35.9,0.1-51.3c18-5.9,30-22.4,30.1-41.4c4.3,1.4,8.8,2.1,13.4,2.1c13.9,0,27.1-6.7,35.3-17.9 c8.2,11.2,21.4,17.9,35.4,17.9c4.7,0,9.3-0.7,13.4-2.2c0,18.8,11.9,35.3,29.9,41.4c-11.1,15.4-11.1,35.8,0,51.3 c-18,5.9-29.9,22.4-30,41.4C158.6,160,139.2,166.3,127.9,181.7z"></path> <path d="M168.4,92.1c-15.3-6.4-27.3-18.3-33.8-33.6c-1.1-2.7-3.8-4.5-6.7-4.5c-2.9,0-5.6,1.8-6.7,4.4 c-6.5,15.2-18.4,27.1-33.6,33.6c-2.7,1.1-4.5,3.7-4.5,6.6c0,2.9,1.7,5.5,4.4,6.7c14.7,6.4,26.9,18.8,33.6,34 c1.2,2.7,3.8,4.4,6.6,4.4c0,0,0,0,0,0c2.9,0,5.5-1.7,6.6-4.4c6.4-14.8,18.8-27.1,34.1-33.9c2.6-1.2,4.3-3.8,4.3-6.7 C172.8,95.8,171.1,93.2,168.4,92.1z M127.8,130.6c-7.2-13.6-18.3-24.8-31.5-31.9c13.6-7,24.6-17.9,31.6-31.5 c7,13.7,18.1,24.7,31.8,31.6C146,106.1,134.8,117.3,127.8,130.6z"></path> <path d="M98.6,188.8c-2.3-1.5-5.3-0.8-6.8,1.4l-26.2,40.1l-13.1-26.9l-27.3-0.1l27.4-42c1.5-2.3,0.8-5.3-1.4-6.8 c-2.3-1.5-5.3-0.8-6.8,1.4L7.1,213.1l39.3,0.1l18,36.9l35.6-54.5C101.5,193.3,100.9,190.2,98.6,188.8z"></path> <path d="M211.5,155.9c-1.5-2.3-4.5-2.9-6.8-1.4c-2.3,1.5-2.9,4.5-1.4,6.8l27.5,42l-27.4,0.1l-13.1,26.9l-26.2-40.1 c-1.5-2.3-4.5-2.9-6.8-1.4c-2.3,1.5-2.9,4.5-1.4,6.8l35.7,54.5l18-36.9l39.3-0.1L211.5,155.9z"></path> </g> </g></svg>
              </div>
              <h3>Excelencia</h3>
              <p>Nos esforzamos por alcanzar la excelencia en cada servicio que ofrecemos.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
              <svg
    version="1.1"
    id="_x32_"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    fill="#ffffff"
    stroke="#ffffff"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <style type="text/css">{".st0{fill:#ffffff;}"}</style>
      <g>
        <path
          className="st0"
          d="M512,216.906c-0.031-29.313-23.781-53.078-53.094-53.094h-75.891c-3.531,0-43.578,0-47.219,0 c-6.953,0.063-13.328,1.094-17.969,1.031c-1.859,0-3.328-0.156-4.188-0.344L313,164.313l-0.156-0.469 c-0.141-0.609-0.281-1.625-0.281-3.094c0-0.906,0.141-2.188,0.25-3.438l30.281-74.875c2.906-7.188,4.281-14.656,4.281-21.969 c0.031-23.188-13.844-45.156-36.656-54.406c-7.156-2.891-14.641-4.281-21.984-4.281c-23.203-0.016-45.141,13.875-54.391,36.672 l-0.047,0.078l-51.359,129.313h0.031c-3.438,8.063-6.203,15.625-8.906,22.156c-4.078,10.031-8.063,17.25-12.766,21.438 c-2.359,2.125-4.922,3.719-8.484,4.969c-3.531,1.219-8.172,2.047-14.391,2.047c-3.781-0.016-7.375,0.422-10.891,1.078H44.5 c-24.594,0-44.5,19.922-44.5,44.5v201.703c0,24.578,19.906,44.484,44.5,44.484h61.578c13.641,0,24.719-11.063,24.719-24.719 v-20.484c4.328,2.531,8.891,4.828,13.797,6.672c17.156,6.5,37.531,9.219,62.063,9.219h191.25c29.313,0,53.094-23.719,53.094-53.047 c0-6.891-1.406-13.453-3.828-19.453c21.156-7,36.453-26.875,36.453-50.375c0.016-9.594-2.688-18.547-7.141-26.25 c6.422-5.25,10.781-12.156,13.266-19.375c2.719-7.75,3.656-15.906,3.656-24.203c0-5.141-1.094-10.141-2.969-15.016 c-1.375-3.469-3.172-6.891-5.375-10.125C501.125,253.938,511.984,236.703,512,216.906z M458.938,243.797h-8.844 c-3.469,0-6.813,1.391-9.25,3.828s-3.844,5.813-3.844,9.25s1.406,6.813,3.844,9.25s5.781,3.844,9.25,3.844 c2.516,0,4.578,0.563,6.594,1.609c2.969,1.516,5.797,4.375,7.75,7.719c1.969,3.281,2.875,7.047,2.813,8.906 c0.031,8.297-1.438,15.078-3.719,19.078c-1.156,2.031-2.391,3.453-3.906,4.594c-1.531,1.125-3.438,2.063-6.344,2.688 c-4.938,1-8.813,4.734-10.031,9.625c-1.234,4.906,0.438,10.031,4.344,13.25c6.094,5.094,9.875,12.313,9.875,20.594 c-0.031,14.844-12.047,26.875-26.922,26.906h-6.234c-5.438,0-10.313,3.344-12.219,8.438c-1.938,5.094-0.531,10.813,3.563,14.438 c5.688,5.078,9.172,12.063,9.172,20.047c-0.016,14.844-12.047,26.859-26.922,26.891h-191.25 c-20.063,0.016-36.031-2.063-48.313-5.969c-9.25-2.938-16.391-6.828-22.172-11.688c-1.938-1.656-3.703-3.469-5.375-5.359V245.5 c2.109-0.531,4.547-0.875,7.625-0.875c11.328,0,21.156-2.047,29.453-6.25c6.188-3.109,11.375-7.406,15.5-12.172 c6.188-7.203,10.219-15.297,13.719-23.484c3.5-8.219,6.5-16.625,10.031-24.906l0.156-0.313l51.328-129.281 c5.109-12.625,17.281-20.266,30.125-20.281c4.047,0,8.172,0.766,12.172,2.391c12.656,5.094,20.297,17.266,20.313,30.141 c0,4.047-0.75,8.156-2.375,12.172l-31,76.672c-0.422,1.016-0.688,2.047-0.844,3.125c-0.391,2.906-0.594,5.656-0.594,8.313 c0,4.875,0.688,9.484,2.484,13.781c1.313,3.219,3.297,6.203,5.734,8.563c3.656,3.594,8.078,5.594,12.031,6.625 c4,1.063,7.719,1.281,11.172,1.297c7.422-0.047,14.109-1.094,17.969-1.031c3.641,0,43.688,0,47.219,0h75.891 c14.844-0.016,26.938,12.047,26.938,26.922C485.813,231.75,473.781,243.781,458.938,243.797z"
        ></path>
      </g>
    </g>
  </svg>

              </div>
              <h3>Integridad</h3>
              <p>Actuamos con honestidad, transparencia y ética en todas nuestras relaciones.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
                <svg fill="#ffffff" viewBox="0 -0.14 100.091 100.091" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="_people-structure01" data-name=" people-structure01" d="M486.238,663.487c-1.3-.07-2.579-.338-3.875-.441-1.5-.121-3.008-.141-4.511-.236-1.3-.083-1.912-.6-1.937-1.831a37.4,37.4,0,0,1,.194-7.211c.34-1.977.415-4,1.322-5.836a14.266,14.266,0,0,1,1.321-2.348,4.15,4.15,0,0,1,1.6-1.308,24.811,24.811,0,0,1,3.447-1.045.859.859,0,0,1,.975.526c1.031,2.057,2.057,4.117,3.126,6.156.069.135.663.19.706.112a13.953,13.953,0,0,0,1-2.16c.246-.722-.211-1.345-.474-1.994-.288-.709.025-1.15.8-1.157.7,0,1.4.043,2.1.1a.68.68,0,0,1,.448.929,2.144,2.144,0,0,1-.309.512c-1.031,1.061-.855,2.141-.121,3.275a16.98,16.98,0,0,1,.815,1.6c.826-.133.955-.923,1.334-1.458.753-1.066,1.426-2.189,2.168-3.263a8.214,8.214,0,0,1,1.155-1.374,1.051,1.051,0,0,1,1.394-.08,26.957,26.957,0,0,1,3.6,3.172,6.784,6.784,0,0,1,1.471,4.2c.09,3.011.055,6.03.046,9.045a3.771,3.771,0,0,1-.25,1.164,1.325,1.325,0,0,1-1.269,1.078c-.5.01-1,.065-1.506.067-2.411.006-4.823,0-7.235,0,0,.025,0,.052,0,.076C491.26,663.673,488.746,663.625,486.238,663.487Zm-60.468-.935a4.756,4.756,0,0,0-1.183-.205c-3.3-.215-6.6-.532-9.9-.582-3.017-.047-6-.4-8.984-.7-1.465-.147-1.613-.353-1.7-1.9a33.466,33.466,0,0,1,.887-9.238,12.131,12.131,0,0,1,1.627-3.859,4.7,4.7,0,0,1,2.8-2.125c.673-.19,1.345-.394,2.02-.581a1.135,1.135,0,0,1,1.485.625c.895,1.793,1.759,3.6,2.682,5.379a5.024,5.024,0,0,0,.941,1.135.559.559,0,0,0,.473-.055,24.164,24.164,0,0,0,.776-3.191c.059-.423-.308-.914-.513-1.361-.448-.976-.182-1.477.9-1.534a18.577,18.577,0,0,1,2.1.053c.33.02.653.612.55.938a1.611,1.611,0,0,1-.2.56c-1.407,1.627-.683,3.151.208,4.668a.549.549,0,0,0,.98.018c1.005-1.5,1.974-3.02,3-4.5,1.1-1.6,1.98-1.768,3.48-.608a9.47,9.47,0,0,1,3.978,7.111c.1,1.7.017,3.409.017,5.115h.018c0,1.5.009,3.01-.005,4.513a.707.707,0,0,1-.764.74c-.745,0-1.493.033-2.239.033A10.9,10.9,0,0,1,425.769,662.552Zm43.1-18.779a13.288,13.288,0,0,1-1.5-.991,20.918,20.918,0,0,0-4.322-2.709,5.608,5.608,0,0,1-1.535-.923,11.614,11.614,0,0,0-3.728-1.911,3.38,3.38,0,0,0-3.66.428,12.137,12.137,0,0,1-4.415,1.828,26.126,26.126,0,0,0-4.792,1.728,29,29,0,0,1-3.942,1.46,16.921,16.921,0,0,1-1.757.367c-1.81.4-2.83-.742-3.692-2a2.65,2.65,0,0,1,.883-3.422,7.744,7.744,0,0,0,1.5-.963,7.16,7.16,0,0,1,2.853-1.594q5.345-2,10.653-4.1a1.272,1.272,0,0,0,.685-.842,36.152,36.152,0,0,0-.259-12.533,7.3,7.3,0,0,1,.125-4.147,2.7,2.7,0,0,1,.566-1.034c1.385-1.33,4.635-.9,5.593.726a5.423,5.423,0,0,1,.76,2.871c-.022,2.21-.007,4.418-.007,6.628h-.117c0,2.107-.008,4.216,0,6.323.007,1.275.151,1.519,1.434,1.932a79.234,79.234,0,0,1,8.347,3.4,20.436,20.436,0,0,1,4.857,3.492,1.788,1.788,0,0,1,.565,1.02c.363,2.962-1.759,4.837-4.251,5.2a.723.723,0,0,1-.1.007A1.644,1.644,0,0,1,468.87,643.773Zm21.92-.958a4.721,4.721,0,0,1-3.044-1.154,10.559,10.559,0,0,1-2.825-3.864,15.355,15.355,0,0,1-.7-1.99,1.915,1.915,0,0,0-1.076-1.337c-1.571-.8-1.51-2.25-1.256-3.67a2.018,2.018,0,0,1,.855-1.178,3.372,3.372,0,0,0,1.493-2.455,10.54,10.54,0,0,1,2.114-4.292,4.667,4.667,0,0,1,4.185-2.145c2.755.034,4.349,1.173,5.152,3.617a8.515,8.515,0,0,1,.495,2.342,3.4,3.4,0,0,0,1.17,2.6,3.3,3.3,0,0,1-.065,4.584,4.212,4.212,0,0,0-1.58,3.1,9.691,9.691,0,0,1-1.543,4.208,3.628,3.628,0,0,1-3.229,1.64Zm.855-17.523a5.132,5.132,0,0,0-.774,4.293,17.283,17.283,0,0,1,.536,3.213c0,1.056.729,2.032.721,3.147a.44.44,0,0,0,.15.24c.173-.076.414-.134.487-.275.812-1.589.506-3.319.526-5v-3.3a4.219,4.219,0,0,0-.694-2.263.575.575,0,0,0-.488-.294A.593.593,0,0,0,491.646,625.292ZM416.2,641.866a8.85,8.85,0,0,1-2.973-3.736,20.763,20.763,0,0,1-.845-2.258,1.933,1.933,0,0,0-1.031-1.371c-1.595-.76-1.591-2.217-1.329-3.635a2.516,2.516,0,0,1,1.052-1.39,2.708,2.708,0,0,0,1.235-1.948,10.367,10.367,0,0,1,2.339-4.832c1.067-1.287,2.383-2.167,3.893-1.966,2.846.017,4.481,1.145,5.273,3.553a9.938,9.938,0,0,1,.522,2.64,3.165,3.165,0,0,0,1.116,2.313,3.3,3.3,0,0,1-.2,4.781,3.756,3.756,0,0,0-1.332,2.59,12.966,12.966,0,0,1-1.107,3.738,4.023,4.023,0,0,1-3.75,2.471A4.969,4.969,0,0,1,416.2,641.866Zm4.154-13.8c-.17.465-.462.886-.626,1.351a1.019,1.019,0,0,0,0,.808c.658.77.342,1.451-.028,2.2a7.144,7.144,0,0,0-.374,1.358c1.02.6.186,1.4.238,2.111a3.794,3.794,0,0,0,.2,1.165,4.691,4.691,0,0,0,.685.923,3.58,3.58,0,0,0,.491-.716,4.552,4.552,0,0,0,.381-1.425c.063-2.786.116-5.572.077-8.357a6.456,6.456,0,0,0-.6-1.958c-.045-.125-.252-.206-.4-.27-.033-.014-.152.119-.2.2a2.567,2.567,0,0,0-.588,1.874C420.021,627.406,420.653,627.267,420.356,628.067Zm-.986-.6c-.047.027-.057.115-.084.176l.169-.21A.315.315,0,0,0,419.369,627.462Zm21.01-22.705a34.783,34.783,0,0,1-.165-4.809,28.58,28.58,0,0,1,1.082-7.412,23.352,23.352,0,0,1,1.332-3.015,4.4,4.4,0,0,1,2.974-2.355c.1-.025.194-.058.293-.078a8.24,8.24,0,0,1,2.6-.537c1.086.131.828,1.453,1.311,2.176.663,1,1.205,2.078,1.8,3.123.433.759.506,1.776,1.513,2.125.249-.754.517-1.5.743-2.268a2.39,2.39,0,0,0-.107-1.756,4.685,4.685,0,0,1-.393-1.418.758.758,0,0,1,.627-.887,25.927,25.927,0,0,1,2.974.136c.327.03.54.661.383.993a1.4,1.4,0,0,0-.133.268c-.189.78-1.244,1.194-1.042,2.068a18.28,18.28,0,0,0,1.044,2.8.513.513,0,0,0,.48.092,2.655,2.655,0,0,0,.594-.656c.786-1.164,1.547-2.346,2.336-3.509a14.2,14.2,0,0,1,1.1-1.427,1.237,1.237,0,0,1,1.642-.2,29.022,29.022,0,0,1,3.555,3.223,6.812,6.812,0,0,1,1.459,4.2c.085,3.01.041,6.021.017,9.033,0,.727-.353.99-1.193.992-3.013.013-6.025.006-9.037.006v.094c-2.812,0-5.623-.045-8.434.014-2.6.052-5.2.234-7.807.324q-.1,0-.194,0C440.778,606.1,440.464,605.8,440.379,604.757ZM452.4,585.091a8.943,8.943,0,0,1-2.959-3.748,19.679,19.679,0,0,1-.838-2.26,1.953,1.953,0,0,0-1.054-1.356c-1.589-.777-1.567-2.237-1.289-3.65a2.481,2.481,0,0,1,1.066-1.379,2.659,2.659,0,0,0,1.213-1.96,10.812,10.812,0,0,1,2.168-4.59,4.673,4.673,0,0,1,4.216-2.175c2.717.024,4.323,1.157,5.129,3.584a8.641,8.641,0,0,1,.5,2.342,3.451,3.451,0,0,0,1.142,2.609,3.284,3.284,0,0,1-.244,4.772,3.753,3.753,0,0,0-1.312,2.6,12.746,12.746,0,0,1-1.119,3.732,4.008,4.008,0,0,1-3.736,2.442A4.964,4.964,0,0,1,452.4,585.091Zm3.643-16.586a4.853,4.853,0,0,0-.8,4.281c.487,2.112.666,4.278,1.241,6.365.03.1.262.167.409.2.065.013.2-.086.227-.16a5.98,5.98,0,0,0,.456-1.4c.118-1.193.145-2.4.21-3.6h-.12v-3.3a4.252,4.252,0,0,0-.678-2.271.628.628,0,0,0-.522-.333A.542.542,0,0,0,456.046,568.5Z" transform="translate(-403.954 -563.955)"></path> </g></svg>
              </div>
              <h3>Trabajo en Equipo</h3>
              <p>Fomentamos la colaboración y el respeto mutuo para lograr objetivos comunes.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
              <svg viewBox="-7.77 0 61.035 61.035" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Group_29" data-name="Group 29" transform="translate(-788.374 -1136.157)"> <path id="Path_73" data-name="Path 73" d="M827.765,1167.51a16.353,16.353,0,1,0-21.69,15.443v12.239H816.75v-12.239A16.346,16.346,0,0,0,827.765,1167.51Z" fill="#ffffff" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></path> <rect id="Rectangle_13" data-name="Rectangle 13" width="14.217" height="5.549" transform="translate(804.387 1187.563)" fill="#ffffff" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></rect> <line id="Line_34" data-name="Line 34" y2="3.813" transform="translate(811.413 1138.157)" fill="#ffffff" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line> <line id="Line_35" data-name="Line 35" x1="2.419" y2="2.948" transform="translate(828.636 1145.697)" fill="#ffffff" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line> <line id="Line_36" data-name="Line 36" x2="2.419" y2="2.948" transform="translate(791.188 1145.697)" fill="#ffffff" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"></line> </g> </g></svg>
              </div>
              <h3>Innovación</h3>
              <p>Buscamos constantemente nuevas formas de mejorar nuestros servicios y procesos.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z" fill="#ffffff"></path> </g></svg>
              </div>
              <h3>Pasión</h3>
              <p>Amamos lo que hacemos y lo demostramos en cada detalle de nuestro trabajo.</p>
            </div>
          </div>
        </div>

        <div className="historia">
          <h2>Nuestra Historia</h2>
          {/* Reemplazamos el timeline estático con nuestro componente animado */}
          <AnimatedTimeline items={timelineItems} />
        </div>
      </div>

      {/* Reutilizamos el componente NuestroCompromiso */}
      <NuestroCompromiso />

      <div className="equipo" ref={equipoRef}>
        <div className="equipo-container">
          <h2>Nuestro Equipo</h2>
          <p className="equipo-descripcion">
            Contamos con un equipo de profesionales altamente capacitados y con amplia experiencia en la industria
            aeronáutica. Nuestro personal está comprometido con ofrecer un servicio de excelencia y garantizar la
            satisfacción de nuestros clientes.
          </p>

          <div className="equipo-grid">
            <div className="miembro-equipo mq1">
              <div className="miembro-foto">
                <img src="/placeholder.svg?height=300&width=300" alt="Director General" />
              </div>
              <h3>Carlos Rodríguez</h3>
              <p className="miembro-cargo">Director General</p>
              <p className="miembro-descripcion">
                Con más de 20 años de experiencia en la industria aeronáutica, Carlos lidera nuestra empresa con visión
                y compromiso.
              </p>
            </div>

            <div className="miembro-equipo mq2">
              <div className="miembro-foto">
                <img src="/placeholder.svg?height=300&width=300" alt="Directora de Operaciones" />
              </div>
              <h3>María González</h3>
              <p className="miembro-cargo">Directora de Operaciones</p>
              <p className="miembro-descripcion">
                María supervisa todas las operaciones diarias, asegurando la eficiencia y calidad de nuestros servicios.
              </p>
            </div>

            <div className="miembro-equipo mq3">
              <div className="miembro-foto">
                <img src="/placeholder.svg?height=300&width=300" alt="Jefe de Seguridad" />
              </div>
              <h3>Pedro Martínez</h3>
              <p className="miembro-cargo">Jefe de Seguridad</p>
              <p className="miembro-descripcion">
                Pedro es responsable de implementar y mantener los más altos estándares de seguridad en todas nuestras
                operaciones.
              </p>
            </div>

            <div className="miembro-equipo mq4">
              <div className="miembro-foto">
                <img src="/placeholder.svg?height=300&width=300" alt="Coordinadora de Servicios al Cliente" />
              </div>
              <h3>Ana Pérez</h3>
              <p className="miembro-cargo">Coordinadora de Servicios al Cliente</p>
              <p className="miembro-descripcion">
                Ana se encarga de garantizar la satisfacción de nuestros clientes, coordinando todos los aspectos de
                nuestros servicios personalizados.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="certificaciones" ref={certificacionesRef}>
        <div className="certificaciones-container">
          <h2>Certificaciones y Reconocimientos</h2>
          <p className="certificaciones-descripcion">
            En Caracas Flight Services nos enorgullecemos de contar con las certificaciones más importantes de la
            industria, que avalan la calidad y seguridad de nuestros servicios.
          </p>

          <div className="certificaciones-grid">
            <div className="certificacion-item">
              <div className="certificacion-logo">
                <img src="/placeholder.svg?height=150&width=150" alt="Certificación ISO" />
              </div>
              <h3>ISO 9001:2015</h3>
              <p>Certificación de Sistemas de Gestión de Calidad</p>
            </div>

            <div className="certificacion-item">
              <div className="certificacion-logo">
                <img src="/placeholder.svg?height=150&width=150" alt="Certificación INAC" />
              </div>
              <h3>INAC</h3>
              <p>Certificación del Instituto Nacional de Aeronáutica Civil</p>
            </div>

            <div className="certificacion-item">
              <div className="certificacion-logo">
                <img src="/placeholder.svg?height=150&width=150" alt="Certificación IS-BAH" />
              </div>
              <h3>IS-BAH</h3>
              <p>International Standard for Business Aircraft Handling</p>
            </div>

            <div className="certificacion-item">
              <div className="certificacion-logo">
                <img src="/placeholder.svg?height=150&width=150" alt="Certificación NATA" />
              </div>
              <h3>NATA</h3>
              <p>National Air Transportation Association Safety 1st</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

