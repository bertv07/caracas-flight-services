"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../../styles/auth.css"
import { authService } from "../services/authServices" // Nueva ruta del servicio

export default function RegisterForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    setLoading(true)

    try {
      const { confirmPassword, ...dataToSend } = formData
      await authService.register(dataToSend)
      navigate("/login?registered=true")
    } catch (err) {
      setError(err.message || "Error al registrar usuario")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Registro de Usuario</h1>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <legend>Completa tus datos</legend>

        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmar contraseña"
          required
        />

        <button type="submit" className="auth-button au-btn" disabled={loading}>
          {loading ? "Procesando..." : "Registrarse"}
        </button>
      </form>

      <div className="auth-footer">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </div>
    </div>
  )
}
