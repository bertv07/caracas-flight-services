"use client"

import { useState } from "react"
import { Facebook, Instagram, Twitter } from "lucide-react"
import "../styles/cont.css"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "", // Changed from comentario to mensaje to match your form field
  })
  const [error, setError] = useState("")
  const [mensajeExito, setMensajeExito] = useState(false)
  const [enviando, setEnviando] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEnviando(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Handle form submission logic here
      console.log("Form submitted:", formData)

      // Show success message
      setMensajeExito(true)

      // Reset form after submission
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      })
    } catch (err) {
      setError("Hubo un error al enviar el formulario. Por favor intenta de nuevo.")
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="contacto-section">
      <div className="subti titu">
        <h2>Contáctanos</h2>
      </div>

      <div className="contacto-container con-cont">
        {/* Columna izquierda: Información de contacto, redes sociales y mapa */}
        <div className="contact-left-column">
          <div className="contact-info-box">
            <div className="contact-number">
              <h3>Teléfono</h3>
              <p>+123 456 7890</p>
            </div>

            <div className="contact-email">
              <h3>Correo</h3>
              <p>info@empresa.com</p>
            </div>
            <div className="map-container">
              <h3>Ubicación</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d-79.9009933!3d-2.1705376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwMTAnMTMuOSJTIDc5wrA1NCcwMy42Ilc!5e0!3m2!1ses!2sec!4v1617734687085!5m2!1ses!2sec"
                width="100%"
                height="200"
                style={{ border: 0, borderRadius: "12px" }}
                allowFullScreen=""
                loading="lazy"
                title="Ubicación"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Columna derecha: Formulario */}
        <div className="contact-right-column">
          <div className="contacto-form cont-for">
            {error && <div className="mensaje-error">{error}</div>}

            {mensajeExito && (
              <div className="mensaje-exito">¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo</label>
                  <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="asunto">Asunto</label>
                <input type="text" id="asunto" name="asunto" value={formData.asunto} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows="6"
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

