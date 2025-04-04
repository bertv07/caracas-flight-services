"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { isAuthenticated, getUserId } from "../utils/authUtils"
import "../styles/auth.css"
import "../styles/services.css"
import NavBar from "../components/auth/navBarAuth"
import PaymentComponent from "../components/payment-component"

export default function ServiciosPage() {
  const [activeTab, setActiveTab] = useState("todos")
  const isUserAuthenticated = isAuthenticated()
  const [selectedService, setSelectedService] = useState(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState("")

  const servicios = [
    {
      id: 1,
      categoria: "basico",
      titulo: "Servicio Básico: Asistencia Esencial",
      descripcion:
        "Incluye abastecimiento de combustible, estacionamiento en rampa para aeronaves, acceso a sala VIP básica para pasajeros, y servicios de agua potable y limpieza básica de aeronaves.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "USD $300 por aeronave",
      price: 300, // Añadido para PayPal
    },
    {
      id: 2,
      categoria: "intermedio",
      titulo: "Servicio Intermedio: Experiencia Mejorada",
      descripcion:
        "Incluye todo lo del servicio básico, hangaraje para protección de aeronaves, catering estándar para pasajeros y tripulación, coordinación de permisos de vuelo y planificación básica, y transporte terrestre (limusina o taxi) para pasajeros.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "USD $700 por aeronave",
      price: 700, // Añadido para PayPal
    },
    {
      id: 3,
      categoria: "premium",
      titulo: "Servicio Premium: Lujo Integral",
      descripcion:
        "Incluye todo lo del servicio intermedio, sala VIP de lujo con servicios personalizados, catering gourmet y bebidas premium, asistencia completa para tripulación, servicios de mantenimiento preventivo para aeronaves, y gestión de vuelos internacionales (aduanas y migración).",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "USD $1,500 por aeronave",
      price: 1500, // Añadido para PayPal
    },
    {
      id: 4,
      categoria: "ejecutivo",
      titulo: "Servicio Ejecutivo: Solución Corporativa",
      descripcion:
        "Diseñado específicamente para viajes de negocios. Incluye todo lo del servicio premium, más sala de conferencias privada, servicios de secretariado y traducción, conectividad de alta velocidad, coordinación de reuniones en destino y transporte ejecutivo para todo el equipo.",
      imagen: "/placeholder.svg?height=200&width=300",
      precio: "USD $2,200 por aeronave",
      price: 2200, // Añadido para PayPal
    },
  ]

  const filteredServicios =
    activeTab === "todos" ? servicios : servicios.filter((servicio) => servicio.categoria === activeTab)

  const handleSubscribe = (service) => {
    if (isUserAuthenticated) {
      setSelectedService(service)
      setShowPaymentModal(true)
    } else {
      // Si no está autenticado, redirigir a registro
      window.location.href = "/register"
    }
  }

  const handlePaymentSuccess = async (paymentData) => {
    try {
      const userId = getUserId()
      const serviceId = selectedService.id

      // Preparar los datos para enviar a la API
      const subscriptionData = {
        userId,
        serviceId,
        frequency: paymentData.frequency,
        startDate: paymentData.startDate,
        endDate: paymentData.endDate,
        paymentMethod: paymentData.paymentMethod,
        paymentDetails: JSON.stringify(paymentData),
        status: paymentData.status || "pending",
      }

      console.log("Enviando datos de suscripción:", subscriptionData)

      // Enviar los datos a la API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(subscriptionData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Error al crear la suscripción")
      }

      // Configurar mensaje según el método de pago
      let successMessage = ""
      if (paymentData.paymentMethod === "paypal") {
        successMessage = "¡Pago con PayPal exitoso! Su suscripción ha sido procesada correctamente."
      } else if (paymentData.paymentMethod === "pagomovil") {
        successMessage = "¡Solicitud de Pago Móvil registrada! Verificaremos su pago y activaremos su suscripción."
      } else if (paymentData.paymentMethod === "efectivo") {
        successMessage =
          "¡Solicitud de pago en efectivo registrada! Un representante se comunicará con usted para coordinar la entrega."
      }

      setPaymentMessage(successMessage)
      setPaymentSuccess(true)

      // Cerrar el modal después de 3 segundos
      setTimeout(() => {
        setShowPaymentModal(false)
        setSelectedService(null)
        setPaymentSuccess(false)

        // Redirigir a la página de suscripciones
        window.location.href = "/subscriptions"
      }, 3000)
    } catch (error) {
      console.error("Error:", error)
      alert("Error al procesar la suscripción: " + error.message)
    }
  }

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
                  <button className="service-button" onClick={() => handleSubscribe(servicio)}>
                    Inscribirse
                  </button>
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

      {/* Modal de pago */}
      {showPaymentModal && selectedService && (
        <PaymentComponent
          service={selectedService}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Modal de éxito - se muestra después de un pago exitoso */}
      {paymentSuccess && (
        <div
          className="subscription-modal"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >
          <div
            className="mensaje-exito"
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "2rem",
              borderRadius: "12px",
              textAlign: "center",
              maxWidth: "400px",
              width: "100%",
            }}
          >
            <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>¡Solicitud Exitosa!</h3>
            <p>{paymentMessage}</p>
            <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>Redirigiendo a sus suscripciones...</p>
          </div>
        </div>
      )}
    </div>
  )
}

