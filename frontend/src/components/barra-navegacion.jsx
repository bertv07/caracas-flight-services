"use client"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/img/logo.png"
import { isAuthenticated, getUserRole } from "../utils/authUtils"
import "../styles/navbar.css"

export default function BarraNavegacion() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const authenticated = isAuthenticated()
  const userRole = getUserRole()

  // Add scroll event listener for color change animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        document.querySelectorAll(".ff-00").forEach((el) => {
          el.style.color = "#fff"
          el.style.transition = "color 1s"
        })
      } else {
        document.querySelectorAll(".ff-00").forEach((el) => {
          el.style.color = "#000"
          el.style.transition = "color 1s"
        })
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const handleProgramasClick = (e) => {
    e.preventDefault()
    navigate(authenticated ? "/dashboard" : "/login")
  }

  const navIconStyles = {
    width: "24px",
    height: "24px",
  }

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-links-">
          <Link to="/" className="nav-item ff-00" onClick={closeMenu}>Home</Link>
          <Link to="/contacto" className="nav-item ff-00" onClick={closeMenu}>Contáctanos</Link>
          <Link to="/ubicacion" className="nav-item ff-00" onClick={closeMenu}>Ubicación</Link>
          <Link to="/acerca-de" className="nav-item ff-00" onClick={closeMenu}>Acerca de</Link>
          <a href="#" onClick={handleProgramasClick} className="nav-item ff-00">Servicios</a>

          <div className="auth-button">
            {authenticated ? (
              <div className="auth-button au-btns-links">
                <Link to="/dashboard" className="auth-button custom-admin" onClick={closeMenu}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="9" r="3" stroke="#ffffff" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5"/>
                    <path 
                      d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin/dashboard" className=" custom-admin custom-admin-w amd" onClick={closeMenu}>
                    <svg
                      style={navIconStyles}
                      fill="#ffffff"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.3,16.7l1.4-1.4L20,11.6l-5.8,5.8c-0.5-0.3-1.1-0.4-1.7-0.4C10.6,17,9,18.6,9,20.5s1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5 c0-0.6-0.2-1.2-0.4-1.7l1.9-1.9l2.3,2.3l1.4-1.4l-2.3-2.3l1.1-1.1L22.3,16.7z M12.5,22c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5 s1.5,0.7,1.5,1.5S13.3,22,12.5,22z"/>
                      <path d="M2,19c0-3.9,3.1-7,7-7c2,0,3.9,0.9,5.3,2.4l1.5-1.3c-0.9-1-1.9-1.8-3.1-2.3C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6 S3,2.7,3,6c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h8v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z"/>
                    </svg>
                  </Link>
                )}
              </div>
            ) : (
              <Link to="/login" className="custom-admin custom-admin-w" onClick={closeMenu}>
                <svg 
                  height="200px" 
                  width="200px" 
                  viewBox="0 0 512 512" 
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                >
                  <path d="M155.81,0v173.889h33.417V33.417h235.592l-74.87,50.656c-8.469,5.727-13.535,15.289-13.535,25.503v286.24 H189.227V282.079H155.81v147.154h180.604v70.93c0,4.382,2.423,8.404,6.29,10.451c3.867,2.056,8.558,1.811,12.189-0.644 l119.318-80.736V0H155.81z"/>
                  <path d="M228.657,290.4c0,1.844,1.068,3.524,2.75,4.3c1.664,0.775,3.638,0.514,5.042-0.685l78.044-66.035 l-78.044-66.034c-1.404-1.2-3.378-1.46-5.042-0.686c-1.681,0.775-2.75,2.456-2.75,4.3v33.392H37.79v58.064h190.868V290.4z"/>
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="nav-bar-bg custom-nav"></div>
      <div className={`nav-bar custom-nav-bar ${isOpen ? "active" : ""}`}>
        <div className="logo nav-header">
          <Link to="/" onClick={closeMenu}>
            <img src={logo || "/placeholder.svg"} alt="Logo" />
          </Link>
        </div>
        
        <div className="custom-nav-links">
          <Link to="/" className="custom-nav-item" onClick={closeMenu}>Home</Link>
          <Link to="/contacto" className="custom-nav-item" onClick={closeMenu}>Contáctanos</Link>
          <Link to="/ubicacion" className="custom-nav-item" onClick={closeMenu}>Ubicación</Link>
          <Link to="/acerca-de" className="custom-nav-item" onClick={closeMenu}>Acerca de</Link>
          <a href="#" onClick={handleProgramasClick} className="custom-nav-item">Servicios</a>

          <div className="custom-auth-button au-btns">
            {authenticated ? (
              <>
                <Link to="/dashboard" className="custom-auth-button au-btn" onClick={closeMenu}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="9" r="3" stroke="#ffffff" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="1.5"/>
                    <path
                      d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
                {userRole === "admin" && (
                  <Link to="/admin/dashboard" className="custom-auth-button au-btn custom-admin" onClick={closeMenu}>
                    <svg
                      style={navIconStyles}
                      fill="#ffffff"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.3,16.7l1.4-1.4L20,11.6l-5.8,5.8c-0.5-0.3-1.1-0.4-1.7-0.4C10.6,17,9,18.6,9,20.5s1.6,3.5,3.5,3.5s3.5-1.6,3.5-3.5 c0-0.6-0.2-1.2-0.4-1.7l1.9-1.9l2.3,2.3l1.4-1.4l-2.3-2.3l1.1-1.1L22.3,16.7z M12.5,22c-0.8,0-1.5-0.7-1.5-1.5s0.7-1.5,1.5-1.5 s1.5,0.7,1.5,1.5S13.3,22,12.5,22z"/>
                      <path d="M2,19c0-3.9,3.1-7,7-7c2,0,3.9,0.9,5.3,2.4l1.5-1.3c-0.9-1-1.9-1.8-3.1-2.3C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6 S3,2.7,3,6c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h8v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z"/>
                    </svg>
                  </Link>
                )}
              </>
            ) : (
              <Link to="/login" className="custom-auth-button" onClick={closeMenu}>
              Iniciar Sesión
            </Link>
            )}
          </div>
        </div>

        <div className="custom-hamburger" onClick={toggleMenu}>
          <span className="custom-line custom-line1"></span>
          <span className="custom-line custom-line2"></span>
          <span className="custom-line custom-line3"></span>
        </div>
      </div>
    </nav>
  )
}