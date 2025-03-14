"use client"

import { useState } from "react"
import logo from "../assets/img/logo.png"

export default function BarraNavegacion() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav>
      <div className="nav-container">
        <input type="checkbox" id="nav-check" checked={isOpen} onChange={toggleMenu} style={{ display: "none" }} />
      </div>

      <div className="nav-bar-bg"></div>

      <div className={`nav-bar ${isOpen ? "active" : ""}`}>
        <div className="logo nav-header">
        <img src={logo} alt="Logo"/>
        </div>

        <div className="pags nav-list">
          <a href="#contacto" className="ff-00 resp">
            Contáctanos
          </a>
          <a href="#ubicacion" className="ff-00">
            Ubicación
          </a>
          <a href="#nosotros" className="ff-00">
            Acerca de
          </a>
          <a href="#servicios" className="ff-00">
            Servicios
          </a>
          <a href="#programas" className="ff-00">
            Programas
          </a>
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

