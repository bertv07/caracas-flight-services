import { useState } from "react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    comentario: "",
    telefono: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
      telefono: ""
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