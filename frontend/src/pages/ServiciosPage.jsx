"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../utils/authUtils"
import "../styles/auth.css"
import "../styles/services.css"
import NavBar from "../components/auth/navBarAuth"

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState("todos")
  const isUserAuthenticated = isAuthenticated()

  const servicios = [
    {
      id: 1,
      categoria: "basico",
      titulo: "Servicio Básico: Asistencia Esencial",
      descripcion:
        "Incluye abastecimiento de combustible, estacionamiento en rampa para aeronaves, acceso a sala VIP básica para pasajeros, y servicios de agua potable y limpieza básica de aeronaves.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "USD $300 por aeronave",
    },
    {
      id: 2,
      categoria: "intermedio",
      titulo: "Servicio Intermedio: Experiencia Mejorada",
      descripcion:
        "Incluye todo lo del servicio básico, hangaraje para protección de aeronaves, catering estándar para pasajeros y tripulación, coordinación de permisos de vuelo y planificación básica, y transporte terrestre (limusina o taxi) para pasajeros.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "USD $700 por aeronave",
    },
    {
      id: 3,
      categoria: "premium",
      titulo: "Servicio Premium: Lujo Integral",
      descripcion:
        "Incluye todo lo del servicio intermedio, sala VIP de lujo con servicios personalizados, catering gourmet y bebidas premium, asistencia completa para tripulación, servicios de mantenimiento preventivo para aeronaves, y gestión de vuelos internacionales (aduanas y migración).",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "USD $1,500 por aeronave",
    },
    {
      id: 4,
      categoria: "ejecutivo",
      titulo: "Servicio Ejecutivo: Solución Corporativa",
      descripcion:
        "Diseñado específicamente para viajes de negocios. Incluye todo lo del servicio premium, más sala de conferencias privada, servicios de secretariado y traducción, conectividad de alta velocidad, coordinación de reuniones en destino y transporte ejecutivo para todo el equipo.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "USD $2,200 por aeronave",
    },
  ]

  const filteredServicios =
    activeTab === "todos" ? servicios : servicios.filter((servicio) => servicio.categoria === activeTab)

  return (
    <div>
      <NavBar></NavBar>
      <div className="cont-ser">
        <h1 className="services-title">Nuestros Servicios para Aeronaves</h1>

        {/* Tabs de filtrado */}
        <div className="filter-tabs">
          <button
            onClick={() => setActiveTab("todos")}
            className={`filter-tab ${activeTab === "todos" ? "active" : ""}`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab("basico")}
            className={`filter-tab ${activeTab === "basico" ? "active" : ""}`}
          >
            Básico
          </button>
          <button
            onClick={() => setActiveTab("intermedio")}
            className={`filter-tab ${activeTab === "intermedio" ? "active" : ""}`}
          >
            Intermedio
          </button>
          <button
            onClick={() => setActiveTab("premium")}
            className={`filter-tab ${activeTab === "premium" ? "active" : ""}`}
          >
            Premium
          </button>
          <button
            onClick={() => setActiveTab("ejecutivo")}
            className={`filter-tab ${activeTab === "ejecutivo" ? "active" : ""}`}
          >
            Ejecutivo
          </button>
        </div>

        {/* Grid de servicios */}
        <div className="services-grid">
          {filteredServicios.map((servicio) => (
            <div key={servicio.id} className="service-card1">
              <img src={servicio.imagen || "/placeholder.svg"} alt={servicio.titulo} className="service-image" />
              <div className="service-content">
                <h3 className="service-title">{servicio.titulo}</h3>
                <p className="service-description">{servicio.descripcion}</p>
                <div className="service-footer">
                  <span className="service-price">{servicio.precio}</span>
                  <Link to="/register" className="service-button">
                    Inscribirse
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA - Solo se muestra si el usuario no ha iniciado sesión */}
        {!isUserAuthenticated && (
          <div className="cta-container">
            <h2 className="cta-title">¿Listo para mejorar la experiencia de vuelo?</h2>
            <p className="cta-description">
              Regístrate ahora y obtén una consulta inicial gratuita con nuestros especialistas en servicios para
              aeronaves.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="cta-button primary">
                Registrarse
              </Link>
              <Link to="/login" className="cta-button secondary">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

