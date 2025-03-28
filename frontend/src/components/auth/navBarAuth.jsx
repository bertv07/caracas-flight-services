"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/img/logo.png"
import { isAuthenticated, getUserRole } from "../../utils/authUtils"
export default function NavBar() {
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
      navigate("/servicios")
    } else {
      navigate("/servicios")
    }
  }

  return (
    <nav>
      <div className="nav-container1">
        <input type="checkbox" id="nav-check" checked={isOpen} onChange={toggleMenu} style={{ display: "none" }} />
      </div>

      <div className={`nav-bar1 ${isOpen ? "active" : ""}`}>
        <div className="logo lg nav-header">
          <Link to="/">
            <img src={logo || "/placeholder.svg"} alt="Logo" />
          </Link>
        </div>

        <div className="pags nav-list">
          <Link to="/" className="ff-00-1 resp">
            Home
          </Link>
          <Link to="/contacto" className="ff-00-1 resp">
            Contáctanos
          </Link>
          <Link to="/ubicacion" className="ff-00-1">
            Ubicación
          </Link>
          <Link to="/acerca-de" className="ff-00-1">
            Acerca de
          </Link>
          <a href="#" onClick={handleProgramasClick} className="ff-00-1">
            Servicios
          </a>

          {/* Botones de autenticación */}
          <div className="auth-buttons" style={{ marginLeft: "20px", display: "flex", gap: "10px" }}>
            {authenticated ? (
              <>
                <Link to="/dashboard" className="auth-nav-button ff-00-1">
                  Mi Cuenta
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin/dashboard" className="auth-nav-button admin ff-00-1">
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

