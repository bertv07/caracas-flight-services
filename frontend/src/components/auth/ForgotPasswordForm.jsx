"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../../styles/auth.css"

// Importar el servicio de autenticación
import { authService } from "../services/authServices" // Nueva ruta del servicio

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // Reemplazar la función handleSubmit con esta versión que usa el servicio
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      // Usar el servicio de autenticación
      await authService.forgotPassword(email)
      setSuccess(true)
    } catch (err) {
      setError(err.message || "Error al procesar la solicitud")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <h1 className="auth-title">Recuperar Contraseña</h1>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div style={{ maxWidth: "500px", textAlign: "center" }}>
          <div className="alert alert-success">
            <span className="alert-icon">✓</span>
            <span>Se ha enviado un correo con instrucciones para restablecer tu contraseña.</span>
          </div>

          <Link to="/login" className="auth-link" style={{ color: "var(--color-green)" }}>
            Volver al inicio de sesión
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <legend>Ingresa tu correo electrónico</legend>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />

          <div className="auth-form-row">
            <Link to="/login" className="auth-link">
              Volver al inicio de sesión
            </Link>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

