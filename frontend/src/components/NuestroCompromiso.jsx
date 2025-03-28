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
              <i className="fas fa-shield-alt"></i>
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
              <i className="fas fa-star"></i>
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
              <i className="fas fa-leaf"></i>
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
              <i className="fas fa-users"></i>
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
              <i className="fas fa-graduation-cap"></i>
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
              <i className="fas fa-handshake"></i>
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

