"use client"

import { useState } from "react"
import { Facebook, Instagram, Twitter } from "lucide-react"
import "../styles/contacto-form.css"
export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    comentario: "",
    telefono: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
    // Reset form after submission
    setFormData({
      nombre: "",
      email: "",
      comentario: "",
      telefono: "",
    })
  }

  return (
    <section className="contact-section">
      <div className="subti titu">
        <h2>Contáctanos</h2>
      </div>

      <div className="contact-container">
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

            <div className="social-media-container">
              <h3>Redes Sociales</h3>
              <div className="social-icons">
                <a href="#" aria-label="Facebook" className="social-icon-link">
                  <Facebook className="social-icon" />
                </a>
                <a href="#" aria-label="Instagram" className="social-icon-link">
                  <Instagram className="social-icon" />
                </a>
                <a href="#" aria-label="Twitter" className="social-icon-link">
                  <Twitter className="social-icon" />
                </a>
              </div>
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
          <div className="formulario">
            <form onSubmit={handleSubmit}>
              <legend>Envianos un mensaje</legend>

              <div className="pera-fila">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Nombre"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>
              <div className="comen">
                <textarea
                  id="comentario"
                  name="comentario"
                  value={formData.comentario}
                  onChange={handleChange}
                  placeholder="Comentario"
                  rows="5"
                ></textarea>
              </div>
              <div className="tera-fila">
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Teléfono"
                />
                <div className="enviar-button">
                  <button type="submit">Enviar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

