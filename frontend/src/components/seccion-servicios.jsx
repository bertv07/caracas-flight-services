"use client"

import { useState, useEffect, useRef } from "react"
import { animateServiceSlides } from "../utils/animations"

export default function SeccionServicios() {
  const [indiceActivo, setIndiceActivo] = useState(1)
  const [esMovil, setEsMovil] = useState(false)
  const avionIconoRef = useRef(null)
  const intervalRef = useRef(null)
  const animationsRef = useRef(null)

  const servicios = [
    {
      id: 1,
      titulo: "Verificación del sistema meteorológico de la ruta",
      descripcion: "Analizamos las condiciones climáticas para garantizar un vuelo seguro y cómodo.",
    },
    {
      id: 2,
      titulo: "Remolque de la aeronave",
      descripcion: "Ofrecemos servicios de remolque eficientes y seguros para su aeronave.",
    },
    {
      id: 3,
      titulo: "Monitoreo de vuelo en ruta",
      descripcion: "Seguimiento en tiempo real de su vuelo para garantizar la seguridad y puntualidad.",
    },
    {
      id: 4,
      titulo: "Chequeo de notams en el aeropuerto de salida, alternado y llegada",
      descripcion: "Revisamos todos los avisos importantes para garantizar un viaje sin contratiempos.",
    },
    {
      id: 5,
      titulo: "Contacto con el FBO en destino",
      descripcion: "Coordinamos con el FBO de destino para asegurar todos los servicios necesarios a su llegada.",
    },
    {
      id: 6,
      titulo: "Manejo del equipaje con el personal capacitado",
      descripcion: "Nuestro personal altamente capacitado se encarga del manejo cuidadoso de su equipaje.",
    },
    {
      id: 7,
      titulo: "Traslado desde caracas al aeropuerto y viceversa",
      descripcion: "Ofrecemos servicios de transporte cómodos y puntuales entre Caracas y el aeropuerto.",
    },
    {
      id: 8,
      titulo: "Catering",
      descripcion:
        "Proporcionamos servicios de catering de alta calidad para satisfacer sus necesidades durante el vuelo.",
    },
    {
      id: 9,
      titulo: "Trámite de permisos sobre vuelo y aterrizaje",
      descripcion: "Nos encargamos de todos los trámites necesarios para obtener permisos de sobrevuelo y aterrizaje.",
    },
  ]

  useEffect(() => {
    const verificarMovil = () => {
      setEsMovil(window.innerWidth < 1280)
    }

    verificarMovil()
    window.addEventListener("resize", verificarMovil)

    // Inicializar animaciones de slides
    animationsRef.current = animateServiceSlides()

    return () => {
      window.removeEventListener("resize", verificarMovil)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Actualizar la rotación del avión
    if (avionIconoRef.current) {
      const angulo = ((indiceActivo - 1) * 360) / servicios.length - 0
      avionIconoRef.current.style.transform = `rotate(${angulo}deg) scale(1.50)`
    }
  }, [indiceActivo, servicios.length])

  useEffect(() => {
    // Configurar rotación automática
    const autoRotar = () => {
      setIndiceActivo((prevIndice) => (prevIndice % servicios.length) + 1)
    }

    intervalRef.current = setInterval(autoRotar, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [servicios.length])

  const manejarClickNumero = (indice) => {
    setIndiceActivo(indice)

    // Reiniciar el intervalo cuando el usuario hace clic
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setIndiceActivo((prevIndice) => (prevIndice % servicios.length) + 1)
    }, 5000)
  }

  const manejarMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const manejarMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setIndiceActivo((prevIndice) => (prevIndice % servicios.length) + 1)
    }, 5000)
  }

  // Calcular posiciones de los números en el círculo
  const calcularPosicion = (index, totalItems, radius) => {
    const angle = ((index * 360) / totalItems - 90) * (Math.PI / 180)
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    return { x, y }
  }

  return (
    <section className="nuestros-sec">
      <h2 className="h2">Nuestros Servicios</h2>

      {/* Versión Desktop */}
      <div className="nuestros">
        <div className="fondo-carruzel">
          <div className="carousel-container">
            {/* Navegación Circular */}
            <div className="circular-nav" onMouseEnter={manejarMouseEnter} onMouseLeave={manejarMouseLeave}>
              <div className="center-icon">
                <svg viewBox="0 0 24 24" className="airplane-icon" ref={avionIconoRef}>
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                </svg>
              </div>
              <div className="numbers">
                {servicios.map((servicio, index) => {
                  const radius = window.innerWidth >= 1280 ? 180 : 100
                  const { x, y } = calcularPosicion(index, servicios.length, radius)

                  return (
                    <span
                      key={servicio.id}
                      className={`number ${indiceActivo === servicio.id ? "active" : ""}`}
                      data-index={servicio.id}
                      onClick={() => manejarClickNumero(servicio.id)}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                    >
                      {servicio.id}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Tarjetas de Servicios */}
            <div className="service-cards">
              {servicios.map((servicio) => (
                <div
                  key={servicio.id}
                  className={`service-card ${indiceActivo === servicio.id ? "active" : ""}`}
                  data-index={servicio.id}
                >
                  <h3>{servicio.titulo}</h3>
                  <p>{servicio.descripcion}</p>
                  <button className="read-more">Leer más</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Versión Tablet */}
      <div className="nuestros-responsive-tablet">
        <div className="colum-one">
          <div
            className="card-nuestros-res1 car-res"
            style={{ backgroundImage: "url(assets/img/map-radar.jpg)", backgroundSize: "cover" }}
          >
            <div className="text-crad-nuestros">
              <h3>Monitoreo de vuelo</h3>
              <p>Seguimiento en tiempo real de su vuelo para garantizar la seguridad y puntualidad.</p>
              <button className="read-more">Leer más</button>
            </div>
          </div>
          <div
            className="card-nuestros-res2 car-res"
            style={{ backgroundImage: "url(assets/img/notams.jpg)", backgroundSize: "cover" }}
          >
            <div className="text-crad-nuestros">
              <h3>Chequeo de notams</h3>
              <p>Revisamos los avisos importantes para garantizar un viaje sin problemas</p>
              <button className="read-more">Leer más</button>
            </div>
          </div>
          <div
            className="card-nuestros-res3 car-res"
            style={{ backgroundImage: "url(assets/img/permisos.jpeg)", backgroundSize: "cover" }}
          >
            <div className="text-crad-nuestros">
              <h3>Contacto con el FBO</h3>
              <p>Coordinamos con el FBO de destino para garantizar todos los servicios a su llegada.</p>
              <button className="read-more">Leer más</button>
            </div>
          </div>
          <div
            className="card-nuestros-res4 car-res"
            style={{ backgroundImage: "url(assets/img/IMG_1540.JPG)", backgroundSize: "cover" }}
          >
            <div className="text-crad-nuestros">
              <h3>Trámite de permisos sobre vuelo y aterrizaje</h3>
              <p>Nos encargamos de todos los trámites necesarios para obtener permisos de sobrevuelo y aterrizaje.</p>
              <button className="read-more">Leer más</button>
            </div>
          </div>
        </div>
      </div>

      {/* Versión Móvil */}
      <div className="nuestros-responsive-tlf">
        <div className="colum-one-tlf">
          <div className="card-nuestros-res1-tlf car-res-tlf cr">
            <div
              className="fondo-ns-tlf-1"
              style={{ backgroundImage: "url(assets/img/map-radar.jpg)", backgroundSize: "cover" }}
            >
              <div className="text-crad-nuestros-tlf s-n-1">
                <h3>Monitoreo de vuelo</h3>
                <p>Seguimiento en tiempo real de su vuelo para garantizar la seguridad y puntualidad.</p>
                <button className="read-more">Leer más</button>
              </div>
            </div>
          </div>
          <div className="card-nuestros-res2-tlf car-res-tlf">
            <div
              className="fondo-ns-tlf-2"
              style={{ backgroundImage: "url(assets/img/notams.jpg)", backgroundSize: "cover" }}
            >
              <div className="text-crad-nuestros-tlf s-n-2">
                <h3>Chequeo de notams</h3>
                <p>Revisamos los avisos importantes para garantizar un viaje sin problemas</p>
                <button className="read-more">Leer más</button>
              </div>
            </div>
          </div>
          <div className="card-nuestros-res3-tlf car-res-tlf">
            <div
              className="fondo-ns-tlf-3"
              style={{ backgroundImage: "url(assets/img/permisos.jpeg)", backgroundSize: "cover" }}
            >
              <div className="text-crad-nuestros-tlf s-n-3">
                <h3>Contacto con el FBO</h3>
                <p>Coordinamos con el FBO de destino para garantizar todos los servicios a su llegada.</p>
                <button className="read-more">Leer más</button>
              </div>
            </div>
          </div>
          <div className="card-nuestros-res4-tlf car-res-tlf">
            <div
              className="fondo-ns-tlf-4"
              style={{ backgroundImage: "url(assets/img/IMG_1540.JPG)", backgroundSize: "cover" }}
            >
              <div className="text-crad-nuestros-tlf s-n-4">
                <h3>Trámite de permisos sobre vuelo y aterrizaje</h3>
                <p>Nos encargamos de todos los trámites necesarios para obtener permisos de sobrevuelo y aterrizaje.</p>
                <button className="read-more">Leer más</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

