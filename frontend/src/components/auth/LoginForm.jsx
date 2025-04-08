"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../../styles/auth.css"

// Importar el servicio de autenticación
import { authService } from "../services/authServices"

export default function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
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
    setLoading(true)

    try {
      const data = await authService.login(formData.emailOrUsername, formData.password)
      console.log("Datos recibidos del servidor:", data)

      // CORREGIDO: Guardar con las claves correctas que espera authUtils.js
      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)
      localStorage.setItem("userId", data.userId)
      localStorage.setItem("status", data.status)

      console.log("Token guardado:", localStorage.getItem("token"))
      console.log("Rol guardado:", localStorage.getItem("role"))

      // Validar estado de aprobación
      if (data.status !== "approved") {
        throw new Error("Cuenta pendiente de aprobación")
      }

      // Redirigir según el rol
      const redirectPath = data.role === "admin" ? "/servicios" : "/servicios"
      console.log("Redirigiendo a:", redirectPath)

      // Usar window.location para una redirección forzada
      window.location.href = redirectPath
    } catch (err) {
      console.error("Error durante el login:", err)
      setError(err.message || "Error al iniciar sesión")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Iniciar Sesión</h1>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <legend>Ingresa tus credenciales</legend>
        <input
          type="text"
          name="emailOrUsername"
          value={formData.emailOrUsername}
          onChange={handleChange}
          placeholder="Email o nombre de usuario"
          autoComplete="username"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          autoComplete="current-password"
          required
        />

        <div className="auth-form-row">
          <Link to="/forgot-password" className="auth-link">
            ¿Olvidaste tu contraseña?
          </Link>

          <button type="submit" className="auth-button au-btn" disabled={loading}>
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </div>
      </form>

      <div className="auth-footer">
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </div>
    </div>
  )
}

