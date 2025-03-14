"use client"

import { useState } from "react"

export default function FormularioContacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    comentario: "",
    telefono: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Formulario enviado:", formData)
    // Aquí iría la lógica para enviar el formulario
    alert("Mensaje enviado con éxito!")
    setFormData({
      nombre: "",
      email: "",
      comentario: "",
      telefono: "",
    })
  }

  return (
    <section>
      <div className="contactanos">
        <div className="subti titu">
          <h2>Contáctanos</h2>
        </div>
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
                required
                placeholder="Email"
              />
            </div>
            <div className="comen">
              <input
                type="text"
                id="comentario"
                name="comentario"
                value={formData.comentario}
                onChange={handleChange}
                placeholder="Comentario"
              />
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
    </section>
  )
}

