"use client"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../../assets/img/logo.png"
import { isAuthenticated, getUserRole } from "../../utils/authUtils"
import "../../styles/navbarAuth.css"

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const authenticated = isAuthenticated()
  const userRole = getUserRole()
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }
  
  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleProgramasClick = (e) => {
    e.preventDefault()
    navigate("/servicios")
    closeMenu()
  }

  const navIconStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    marginRight: "5px",
  }

  return (
    <nav className="custom-nav">
            <div className="nav-container">
        <div className="nav-links- cus-nav-links">
          <Link to="/" className="cus-nav-item" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/contacto" className="cus-nav-item" onClick={closeMenu}>
            Contáctanos
          </Link>
          <Link to="/ubicacion" className="cus-nav-item" onClick={closeMenu}>
            Ubicación
          </Link>
          <Link to="/acerca-de" className="cus-nav-item" onClick={closeMenu}>
            Acerca de
          </Link>
          <a href="#" onClick={handleProgramasClick} className="cus-nav-item">
            Servicios
          </a>

          <div className="auth-buttons">
            {authenticated ? (
              <>
                <Link to="/dashboard" className="auth-button" onClick={closeMenu}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <circle cx="12" cy="9" r="3" stroke="#ffffff" strokeWidth="1.5"></circle>{" "}
                      <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5"></circle>{" "}
                      <path
                        d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  Mi Perfil
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin/dashboard" className="auth-button custom-admin" onClick={closeMenu}>
                    <svg
                      style={navIconStyles}
                      fill="#ffffff"
                      height="24px"
                      width="24px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      enableBackground="new 0 0 24 24"
                      xmlSpace="preserve"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g id="user-admin">
                          {" "}
                          <path d="M22.3,16.7l1.4-1.4L20,11.6l-5.8,5.8c-0.5-0.3-1.1-0.4-1.7-0.4C10.6,17,9,18.6,9,20.5s1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5 c0-0.6-0.2-1.2-0.4-1.7l1.9-1.9l2.3,2.3l1.4-1.4l-2.3-2.3l1.1-1.1L22.3,16.7z M12.5,22c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5 s1.5,0.7,1.5,1.5S13.3,22,12.5,22z"></path>{" "}
                          <path d="M2,19c0-3.9,3.1-7,7-7c2,0,3.9,0.9,5.3,2.4l1.5-1.3c-0.9-1-1.9-1.8-3.1-2.3C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6 S3,2.7,3,6c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h8v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z"></path>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="auth-button" onClick={closeMenu}>
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="auth-button custom-register" onClick={closeMenu}>
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Quitamos el input checkbox y usamos directamente el estado */}
      </div>
      <div className={`custom-nav-bar ${isOpen ? "active" : ""}`}>
        <div className="custom-logo">
          <Link to="/" onClick={closeMenu}>
            <img src={logo || "/placeholder.svg"} alt="Logo" />
          </Link>
        </div>

        <div className="custom-hamburger ch" onClick={toggleMenu}>
          <span className="custom-line custom-line1"></span>
          <span className="custom-line custom-line2"></span>
          <span className="custom-line custom-line3"></span>
        </div>

        <div className="custom-nav-links">
          <Link to="/" className="custom-nav-item" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/contacto" className="custom-nav-item" onClick={closeMenu}>
            Contáctanos
          </Link>
          <Link to="/ubicacion" className="custom-nav-item" onClick={closeMenu}>
            Ubicación
          </Link>
          <Link to="/acerca-de" className="custom-nav-item" onClick={closeMenu}>
            Acerca de
          </Link>
          <a href="#" onClick={handleProgramasClick} className="custom-nav-item">
            Servicios
          </a>
          
          <div className="custom-auth-buttons">
            {authenticated ? (
              <>
                <Link to="/dashboard" className="custom-auth-button" onClick={closeMenu}>
                  <svg
                    style={navIconStyles}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <circle cx="12" cy="9" r="3" stroke="#ffffff" strokeWidth="1.5"></circle>{" "}
                      <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5"></circle>{" "}
                      <path
                        d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                  Mi Perfil
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin/dashboard" className="custom-auth-button custom-admin" onClick={closeMenu}>
                    <svg
                      style={navIconStyles}
                      fill="#ffffff"
                      height="24px"
                      width="24px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      enableBackground="new 0 0 24 24"
                      xmlSpace="preserve"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <g id="user-admin">
                          {" "}
                          <path d="M22.3,16.7l1.4-1.4L20,11.6l-5.8,5.8c-0.5-0.3-1.1-0.4-1.7-0.4C10.6,17,9,18.6,9,20.5s1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5 c0-0.6-0.2-1.2-0.4-1.7l1.9-1.9l2.3,2.3l1.4-1.4l-2.3-2.3l1.1-1.1L22.3,16.7z M12.5,22c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5 s1.5,0.7,1.5,1.5S13.3,22,12.5,22z"></path>{" "}
                          <path d="M2,19c0-3.9,3.1-7,7-7c2,0,3.9,0.9,5.3,2.4l1.5-1.3c-0.9-1-1.9-1.8-3.1-2.3C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6 S3,2.7,3,6c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h8v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z"></path>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="custom-auth-button" onClick={closeMenu}>
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="custom-auth-button custom-register" onClick={closeMenu}>
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
