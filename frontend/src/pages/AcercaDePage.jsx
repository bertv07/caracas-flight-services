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
      {isAuthenticated() ? <NavBar /> : <BarraNavegacion />}

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
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Seguridad</h3>
              <p>La seguridad es nuestra prioridad absoluta en todas las operaciones que realizamos.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
                <i className="fas fa-award"></i>
              </div>
              <h3>Excelencia</h3>
              <p>Nos esforzamos por alcanzar la excelencia en cada servicio que ofrecemos.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Integridad</h3>
              <p>Actuamos con honestidad, transparencia y ética en todas nuestras relaciones.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
                <i className="fas fa-users"></i>
              </div>
              <h3>Trabajo en Equipo</h3>
              <p>Fomentamos la colaboración y el respeto mutuo para lograr objetivos comunes.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
                <i className="fas fa-lightbulb"></i>
              </div>
              <h3>Innovación</h3>
              <p>Buscamos constantemente nuevas formas de mejorar nuestros servicios y procesos.</p>
            </div>

            <div className="valor-item">
              <div className="valor-icono">
                <i className="fas fa-heart"></i>
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

