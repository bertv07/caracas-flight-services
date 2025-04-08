"use client"

import { useEffect, useRef } from "react"
import "../styles/nuestro-compromiso.css"

export default function NuestroCompromiso() {
  const sectionRef = useRef(null)
  const itemsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    itemsRef.current.forEach((item) => {
      if (item) {
        observer.observe(item)
      }
    })

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }

      itemsRef.current.forEach((item) => {
        if (item) {
          observer.unobserve(item)
        }
      })
    }
  }, [])

  return (
    <section className="nuestro-compromiso" ref={sectionRef}>
      <div className="compromiso-container">
        <div className="compromiso-header">
          <h2 className="compromiso-title">Nuestro Compromiso</h2>
          <p className="compromiso-subtitle">
            Dedicados a la excelencia en cada aspecto de nuestros servicios aeronáuticos
          </p>
        </div>

        <div className="compromiso-grid">
          <div className="compromiso-item" ref={(el) => (itemsRef.current[0] = el)}>
            <div className="compromiso-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.73169L19.5 5.39836V12.75C19.5 15.6371 17.5419 18.9972 12.2605 20.9533L12 21.0498L11.7395 20.9533C6.45811 18.9972 4.5 15.6371 4.5 12.75V5.39836L12 3.73169ZM6 6.60161V12.75C6 14.8245 7.3659 17.6481 12 19.4479C16.6341 17.6481 18 14.8245 18 12.75V6.60161L12 5.26828L6 6.60161Z"
                  fill="#ffffff"
                ></path>
              </g>
            </svg>

            </div>
            <h3>Seguridad Operacional</h3>
            <p>
              La seguridad es nuestra prioridad absoluta. Implementamos rigurosos protocolos y sistemas de gestión de
              seguridad para garantizar que cada operación se realice con los más altos estándares de seguridad.
            </p>
            <ul className="compromiso-list">
              <li>Certificación IS-BAH Stage II</li>
              <li>Personal capacitado en SMS (Safety Management System)</li>
              <li>Auditorías de seguridad regulares</li>
              <li>Cultura de reporte de incidentes</li>
            </ul>
          </div>

          <div className="compromiso-item" ref={(el) => (itemsRef.current[1] = el)}>
            <div className="compromiso-icon">
            <svg
                viewBox="0 0 1024 1024"
                fill="#ffff"
                className="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M678.584675 765.172506v157.995691l75.697852 31.505938V723.768586a429.379161 429.379161 0 0 1-75.697852 41.40392zM269.717473 723.768586V953.098138l75.697852-31.505938v-156.419694a429.309162 429.309162 0 0 1-75.697852-41.40392zM511.999 798.78444a428.955162 428.955162 0 0 1-105.993793-13.241974v238.457534L511.999 979.886086 617.992793 1023.998V785.542466A429.025162 429.025162 0 0 1 511.999 798.78444zM511.999 0C308.479398 0 142.903721 165.575677 142.903721 369.097279S308.479398 738.192558 511.999 738.192558s369.097279-165.575677 369.097279-369.097279S715.520602 0 511.999 0z m0 660.198711c-161.345685 0-292.611428-131.265744-292.611428-292.611429 0-161.347685 131.265744-292.613428 292.611428-292.613428s292.611428 131.265744 292.611428 292.613428c0 161.347685-131.263744 292.611428-292.611428 292.611429zM511.999 135.563735c-127.93575 0-232.021547 104.083797-232.021547 232.023547S384.06325 599.606829 511.999 599.606829s232.021547-104.083797 232.021547-232.021547c0-127.93775-104.083797-232.021547-232.021547-232.021547zM607.360814 502.999018L511.999 452.865115 416.639186 502.999018l18.211965-106.183793-77.14785-75.199853 106.617792-15.49397L511.999 209.509591l47.679907 96.611811 106.617792 15.49397-77.14785 75.199853 18.211965 106.183793z"></path>
                </g>
              </svg>
            </div>
            <h3>Calidad de Servicio</h3>
            <p>
              Nos esforzamos por superar las expectativas de nuestros clientes en cada interacción. Nuestro sistema de
              gestión de calidad garantiza la consistencia y excelencia en todos nuestros servicios.
            </p>
            <ul className="compromiso-list">
              <li>Certificación ISO 9001:2015</li>
              <li>Evaluaciones continuas de satisfacción del cliente</li>
              <li>Programas de mejora continua</li>
              <li>Atención personalizada a cada cliente</li>
            </ul>
          </div>

          <div className="compromiso-item" ref={(el) => (itemsRef.current[2] = el)}>
            <div className="compromiso-icon">
            <svg viewBox="0 -3 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>clouds [#1274]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-380.000000, -2482.000000)" fill="#ffffff"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M341.85811,2327.773 C341.400852,2325.902 339.841564,2324.416 337.940336,2324.08 C335.400351,2323.631 332.753071,2325.265 332.34194,2327.287 C332.207571,2327.95 332.11632,2328.603 332.057157,2329.125 C332,2329.628 331.562798,2330 331.055402,2330 L331.055402,2330 C330.486839,2330 330.029581,2329.531 330.045625,2328.964 L330.065681,2328.199 C329.737779,2328.076 329.385811,2328 329.013788,2328 C327.172725,2328 325.71271,2329.657 326.055653,2331.554 C326.319378,2333.008 327.696164,2334 329.177237,2334 L336.955628,2334 L337.035849,2334 L337.035849,2333.995 C340.163449,2333.945 342.654299,2331.031 341.85811,2327.773 M344,2329 C344,2332.828 341.046879,2335.934 337.035849,2335.994 C337.035849,2335.994 337.016796,2335.996 337.006769,2335.997 C337.016796,2335.997 337.025821,2336 337.035849,2336 L329.013788,2336 C326.245174,2336 324,2333.761 324,2331 C324,2328.238 326.245174,2326 329.013788,2326 C329.55628,2326 330.069692,2326.108 330.558035,2326.267 C331.625971,2323.759 334.103785,2322 337.008774,2322 C340.885435,2322 344,2325.133 344,2329 M337.035849,2333.983 L337.035849,2333.995 C337.008774,2333.995 336.982702,2334 336.955628,2334 C337.01078,2334 337.035849,2333.985 337.035849,2333.983" id="clouds-[#1274]"> </path> </g> </g> </g> </g></svg>
            </div>
            <h3>Responsabilidad Ambiental</h3>
            <p>
              Estamos comprometidos con la reducción de nuestro impacto ambiental. Implementamos prácticas sostenibles
              en todas nuestras operaciones y promovemos la conciencia ambiental en la industria aeronáutica.
            </p>
            <ul className="compromiso-list">
              <li>Programa de reducción de emisiones de carbono</li>
              <li>Gestión eficiente de residuos</li>
              <li>Uso de energías renovables en nuestras instalaciones</li>
              <li>Promoción de combustibles sostenibles para aviación</li>
            </ul>
          </div>

          <div className="compromiso-item" ref={(el) => (itemsRef.current[3] = el)}>
            <div className="compromiso-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" fill-rule="evenodd" d="M6 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3h-3.51a3.82 3.82 0 0 0 .51-1.911v-5.438a3.867 3.867 0 0 0-1.172-2.766l-4-3.911C9.52 5.694 7.53 5.487 6 6.351V6zm11 1a1 1 0 0 1 1-1h.001a1 1 0 1 1 0 2H18a1 1 0 0 1-1-1zm-3-1a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2H14zm3 6a1 1 0 0 1 1-1h.001a1 1 0 1 1 0 2H18a1 1 0 0 1-1-1zm1 4a1 1 0 1 0 0 2h.001a1 1 0 1 0 0-2H18z" clip-rule="evenodd"></path><path fill="#ffffff" fill-rule="evenodd" d="M5.879 8.707a3 3 0 0 1 4.242 0l3 3A3 3 0 0 1 14 13.828V18a3 3 0 0 1-3 3H9v-3a1 1 0 1 0-2 0v3H5a3 3 0 0 1-3-3v-4.172a3 3 0 0 1 .879-2.12l3-3z" clip-rule="evenodd"></path></g></svg>
            </div>
            <h3>Desarrollo Comunitario</h3>
            <p>
              Reconocemos nuestra responsabilidad con las comunidades donde operamos. Contribuimos activamente al
              desarrollo local a través de diversas iniciativas sociales y educativas.
            </p>
            <ul className="compromiso-list">
              <li>Programas de formación para jóvenes interesados en la aviación</li>
              <li>Colaboración con instituciones educativas locales</li>
              <li>Apoyo a organizaciones benéficas</li>
              <li>Generación de empleo local</li>
            </ul>
          </div>

          <div className="compromiso-item" ref={(el) => (itemsRef.current[4] = el)}>
            <div className="compromiso-icon">
            <svg
              height="200px"
              width="200px"
              version="1.1"
              id="Icons"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 32 32"
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
                <style type="text/css">{".st0{fill:#FFFFFF;}"}</style>
                <path d="M28.9,9.4C28.9,9.4,28.9,9.4,28.9,9.4C28.9,9.3,29,9.2,29,9.1c0,0,0,0,0-0.1c0,0,0,0,0-0.1c0-0.1,0-0.2,0-0.3c0,0,0,0,0-0.1 c0-0.1-0.1-0.2-0.1-0.3c0,0,0,0,0,0c-0.1-0.1-0.1-0.1-0.2-0.2l-11-7c-0.3-0.2-0.8-0.2-1.1,0l-13,9c0,0-0.1,0.1-0.1,0.1 c0,0,0,0-0.1,0c-0.1,0.1-0.1,0.2-0.2,0.3c0,0,0,0,0,0.1C3,10.8,3,10.9,3,11c0,0,0,0,0,0v6v6c0,0.3,0.2,0.7,0.5,0.8l11,7 c0.2,0.1,0.4,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2l13-9c0.2-0.2,0.4-0.4,0.4-0.7s-0.1-0.6-0.3-0.8c-0.9-0.9-1.1-2.2-0.5-3.4l0.7-1.5 c0-0.1,0.1-0.2,0.1-0.3c0,0,0-0.1,0-0.1c0,0,0,0,0,0c0-0.1,0-0.3-0.1-0.4c0,0,0-0.1,0-0.1c0-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0 c-0.9-0.9-1.1-2.2-0.5-3.4L28.9,9.4z M26.6,14.8l-11.6,8L5,16.5v-3.6l9.5,6c0.2,0.1,0.4,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2l10.3-7.1 C25.8,12.8,26,13.8,26.6,14.8z M15,28.8L5,22.5v-3.6l9.5,6c0.2,0.1,0.4,0.2,0.5,0.2c0.2,0,0.4-0.1,0.6-0.2l10.3-7.1 c-0.1,1.1,0.1,2.2,0.7,3.1L15,28.8z"></path>
              </g>
            </svg>

            </div>
            <h3>Formación Continua</h3>
            <p>
              Invertimos constantemente en la capacitación y desarrollo de nuestro equipo. Creemos que un personal bien
              formado es fundamental para ofrecer servicios de la más alta calidad y mantener los estándares de
              seguridad.
            </p>
            <ul className="compromiso-list">
              <li>Programas de capacitación regulares</li>
              <li>Certificaciones internacionales</li>
              <li>Participación en conferencias y seminarios de la industria</li>
              <li>Intercambio de conocimientos con otros FBOs de clase mundial</li>
            </ul>
          </div>

          <div className="compromiso-item" ref={(el) => (itemsRef.current[5] = el)}>
            <div className="compromiso-icon">
            <svg
              fill="#ffffff"
              viewBox="0 0 1920 1920"
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
                <path d="m960 15 266.667 241.92 359.893-13.867 48.747 356.907L1920 820.547l-192 304.64 76.267 352.106-342.934 109.867-167.893 318.613L960 1769.56l-333.44 136.213-167.893-318.613-342.934-109.867L192 1125.187 0 820.547 284.693 599.96l48.747-356.907 359.893 13.867L960 15Zm0 144L764.907 335.96l-32.214 29.227-43.52-1.6-263.253-10.134-35.627 260.907-5.866 43.2-34.454 26.56-208.106 161.387L282.24 1068.44l23.253 36.693-9.28 42.667-55.68 257.387 250.774 80.426 41.493 13.334 20.373 38.506 122.667 232.96 243.84-99.52L960 1654.36l40.32 16.533 243.84 99.52 122.773-232.96 20.267-38.506 41.493-13.334 250.774-80.426-55.68-257.387-9.28-42.667 23.253-36.693 140.48-222.933-208.213-161.387-34.454-26.56-5.866-43.2-35.734-260.907-263.04 10.134-43.626 1.6-32.214-29.227L960 159Zm341.056 613.483 64.533 85.013-561.6 426.24-255.04-255.04 75.414-75.413 189.226 189.226 487.467-370.026Z" />
              </g>
            </svg>
            </div>
            <h3>Ética Empresarial</h3>
            <p>
              Conducimos nuestras operaciones con los más altos estándares éticos. La integridad, transparencia y
              honestidad son valores fundamentales que guían todas nuestras decisiones y acciones.
            </p>
            <ul className="compromiso-list">
              <li>Código de ética riguroso</li>
              <li>Transparencia en todas las operaciones</li>
              <li>Relaciones justas con proveedores y socios</li>
              <li>Cumplimiento estricto de normativas nacionales e internacionales</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

