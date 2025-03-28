"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/contacto-section.css"

export default function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  })

  const [enviando, setEnviando] = useState(false)
  const [mensajeExito, setMensajeExito] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setError("")

    try {
      // Aquí iría la lógica para enviar el formulario a tu backend
      // Por ahora simulamos un envío exitoso
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setMensajeExito(true)
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      })

      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setMensajeExito(false)
      }, 5000)
    } catch (err) {
      setError("Ocurrió un error al enviar el mensaje. Por favor, inténtelo de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section id="contacto">
      <div className="contacto-section">
        <h2 className="contacto-title">Contáctanos</h2>
        <p className="contacto-subtitle">Estamos aquí para atender todas tus necesidades aeronáuticas</p>

        <div className="contacto-container">
          <div className="contacto-info">
            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="info-text">
                <h3>Dirección</h3>
                <p>Aeropuerto Internacional Caracas 'Oscar Machado Zuloaga'</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-phone"></i>
              </div>
              <div className="info-text">
                <h3>Teléfono</h3>
                <p>+58 212-555-1234</p>
                <p>+58 414-123-4567</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="info-text">
                <h3>Email</h3>
                <p>info@caracasflightservices.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="info-text">
                <h3>Horario</h3>
                <p>Lunes a Viernes: 7:00 AM - 7:00 PM</p>
                <p>Sábados y Domingos: 8:00 AM - 5:00 PM</p>
              </div>
            </div>

            <Link to="/contacto" className="ver-mas-btn">
              Más información de contacto
            </Link>
          </div>

          <div className="contacto-form">
            {error && <div className="mensaje-error">{error}</div>}

            {mensajeExito && (
              <div className="mensaje-exito">¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo</label>
                <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="4"
                  value={formData.mensaje}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-button" disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

