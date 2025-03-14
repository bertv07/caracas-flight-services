"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/img/logo.png"
import { isAuthenticated, getUserRole } from "../utils/authUtils"

export default function BarraNavegacion() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const authenticated = isAuthenticated()
  const userRole = getUserRole()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleProgramasClick = (e) => {
    e.preventDefault()
    if (authenticated) {
      navigate("/dashboard")
    } else {
      navigate("/login")
    }
  }

  return (
    <nav>
      <div className="nav-container">
        <input type="checkbox" id="nav-check" checked={isOpen} onChange={toggleMenu} style={{ display: "none" }} />
      </div>

      <div className="nav-bar-bg"></div>

      <div className={`nav-bar ${isOpen ? "active" : ""}`}>
        <div className="logo nav-header">
          <Link to="/">
            <img src={logo || "/placeholder.svg"} alt="Logo" />
          </Link>
        </div>

        <div className="pags nav-list">
          <Link to="/#contacto" className="ff-00 resp">
            Contáctanos
          </Link>
          <Link to="/#ubicacion" className="ff-00">
            Ubicación
          </Link>
          <Link to="/#nosotros" className="ff-00">
            Acerca de
          </Link>
          <Link to="/servicios" className="ff-00">
            Servicios
          </Link>
          <a href="#" onClick={handleProgramasClick} className="ff-00">
            Programas
          </a>

          {/* Botones de autenticación */}
          <div className="auth-buttons" style={{ marginLeft: "20px", display: "flex", gap: "10px" }}>
            {authenticated ? (
              <>
                <Link to="/dashboard" className="auth-nav-button">
                  Mi Cuenta
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin/dashboard" className="auth-nav-button admin">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="auth-nav-button">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="auth-nav-button register">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>

        <div className={`hamburger nav-btn hamburger-lines ${isOpen ? "active" : ""}`}>
          <label htmlFor="nav-check" onClick={toggleMenu}>
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </label>
        </div>
      </div>
    </nav>
  )
}

