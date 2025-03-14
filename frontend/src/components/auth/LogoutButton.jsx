"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LogoutButton() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      // Llamada directa a tu API de backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Para que las cookies se envíen/reciban
      })

      if (response.ok) {
        // Limpiar localStorage
        localStorage.removeItem("userId")
        localStorage.removeItem("role")
        localStorage.removeItem("status")
        localStorage.removeItem("token")

        // Redirigir al login
        navigate("/login")
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="auth-button"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        backgroundColor: "transparent",
        border: "1px solid var(--color-green)",
        color: "var(--color-green)",
      }}
    >
      {loading ? "Cerrando sesión..." : "Cerrar sesión"}
    </button>
  )
}

