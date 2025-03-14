"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../../styles/auth.css"

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
      // Llamada directa a tu API de backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // Para que las cookies se envíen/reciban
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al iniciar sesión")
      }

      // Guardar información del usuario en localStorage
      localStorage.setItem("userId", data.userId)
      localStorage.setItem("role", data.role)
      localStorage.setItem("status", data.status)
      localStorage.setItem("token", data.token)

      // Redirigir según el rol
      if (data.role === "admin") {
        navigate("/admin/dashboard")
      } else {
        navigate("/dashboard")
      }
    } catch (err) {
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

        <div className="auth-form-row">
          <Link to="/forgot-password" className="auth-link">
            ¿Olvidaste tu contraseña?
          </Link>

          <button type="submit" className="auth-button" disabled={loading}>
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

