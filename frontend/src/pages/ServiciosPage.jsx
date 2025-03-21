"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/auth.css"
import NavBar from "../components/auth/navBarAuth"

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState("todos")

  const servicios = [
    {
      id: 1,
      categoria: "entrenamiento",
      titulo: "Entrenamiento Personalizado",
      descripcion: "Programa de entrenamiento adaptado a tus necesidades específicas y objetivos personales.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "$150/mes",
    },
    {
      id: 2,
      categoria: "nutricion",
      titulo: "Plan Nutricional",
      descripcion: "Asesoramiento nutricional personalizado para complementar tu entrenamiento y maximizar resultados.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "$120/mes",
    },
    {
      id: 3,
      categoria: "evaluacion",
      titulo: "Evaluación Física Completa",
      descripcion: "Análisis detallado de tu condición física actual para establecer un punto de partida óptimo.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "$80/sesión",
    },
    {
      id: 4,
      categoria: "entrenamiento",
      titulo: "Entrenamiento Grupal",
      descripcion: "Sesiones de entrenamiento en grupos reducidos para una experiencia más dinámica y motivadora.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "$100/mes",
    },
    {
      id: 5,
      categoria: "recuperacion",
      titulo: "Terapia de Recuperación",
      descripcion: "Técnicas especializadas para acelerar la recuperación muscular y prevenir lesiones.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "$90/sesión",
    },
    {
      id: 6,
      categoria: "nutricion",
      titulo: "Suplementación Deportiva",
      descripcion: "Asesoramiento sobre suplementos deportivos adecuados para tus objetivos específicos.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "$70/consulta",
    },
  ]

  const filteredServicios =
    activeTab === "todos" ? servicios : servicios.filter((servicio) => servicio.categoria === activeTab)

  return (
    <div>
      <NavBar></NavBar>
      <div className="cont-ser" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "3rem",
            color: "var(--color-green)",
            textAlign: "center",
            marginBottom: "40px",
            fontWeight: "300",
          }}
        >
          Nuestros Servicios
        </h1>

        {/* Tabs de filtrado */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginBottom: "40px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => setActiveTab("todos")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "todos" ? "var(--color-green)" : "white",
              color: activeTab === "todos" ? "white" : "var(--color-green)",
              border: "2px solid var(--color-green)",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab("entrenamiento")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "entrenamiento" ? "var(--color-green)" : "white",
              color: activeTab === "entrenamiento" ? "white" : "var(--color-green)",
              border: "2px solid var(--color-green)",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            Entrenamiento
          </button>
          <button
            onClick={() => setActiveTab("nutricion")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "nutricion" ? "var(--color-green)" : "white",
              color: activeTab === "nutricion" ? "white" : "var(--color-green)",
              border: "2px solid var(--color-green)",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            Nutrición
          </button>
          <button
            onClick={() => setActiveTab("evaluacion")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "evaluacion" ? "var(--color-green)" : "white",
              color: activeTab === "evaluacion" ? "white" : "var(--color-green)",
              border: "2px solid var(--color-green)",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            Evaluación
          </button>
          <button
            onClick={() => setActiveTab("recuperacion")}
            style={{
              padding: "10px 20px",
              backgroundColor: activeTab === "recuperacion" ? "var(--color-green)" : "white",
              color: activeTab === "recuperacion" ? "white" : "var(--color-green)",
              border: "2px solid var(--color-green)",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
          >
            Recuperación
          </button>
        </div>

        {/* Grid de servicios */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "30px",
            marginBottom: "50px",
          }}
        >
          {filteredServicios.map((servicio) => (
            <div
              key={servicio.id}
              style={{
                backgroundColor: "white",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <img
                src={servicio.imagen || "/placeholder.svg"}
                alt={servicio.titulo}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <div style={{ padding: "20px" }}>
                <h3
                  style={{
                    color: "var(--color-green)",
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                    fontWeight: "600",
                  }}
                >
                  {servicio.titulo}
                </h3>
                <p
                  style={{
                    color: "#555",
                    marginBottom: "15px",
                    lineHeight: "1.6",
                  }}
                >
                  {servicio.descripcion}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: "#333",
                    }}
                  >
                    {servicio.precio}
                  </span>
                  <Link
                    to="/register"
                    style={{
                      backgroundColor: "var(--color-green)",
                      color: "white",
                      padding: "8px 15px",
                      borderRadius: "30px",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "0.9rem",
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--green-button-hover)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--color-green)")}
                  >
                    Inscribirse
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            backgroundColor: "var(--color-green)",
            padding: "40px",
            borderRadius: "15px",
            textAlign: "center",
            color: "white",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              marginBottom: "20px",
              fontWeight: "300",
            }}
          >
            ¿Listo para comenzar tu transformación?
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "30px",
              maxWidth: "700px",
              margin: "0 auto 30px auto",
            }}
          >
            Regístrate ahora y obtén una consulta inicial gratuita con nuestros especialistas.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <Link
              to="/register"
              style={{
                backgroundColor: "white",
                color: "var(--color-green)",
                padding: "12px 30px",
                borderRadius: "30px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "white"
                e.currentTarget.style.border = "2px solid white"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "white"
                e.currentTarget.style.color = "var(--color-green)"
                e.currentTarget.style.border = "2px solid white"
              }}
              style={{ border: "2px solid white" }}
            >
              Registrarse
            </Link>
            <Link
              to="/login"
              style={{
                backgroundColor: "transparent",
                color: "white",
                padding: "12px 30px",
                borderRadius: "30px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1.1rem",
                border: "2px solid white",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "white"
                e.currentTarget.style.color = "var(--color-green)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "white"
              }}
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

