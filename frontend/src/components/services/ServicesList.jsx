"use client"

import { useState, useEffect } from "react"
import { getUserId, isAuthenticated } from "../../utils/authUtils"
import { useNavigate } from "react-router-dom"
import "../../styles/services.css"

export default function ServicesList() {
  const [services, setServices] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState(null)
  const [subscriptionData, setSubscriptionData] = useState({
    frequency: "monthly",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
  })
  const [showSubscriptionForm, setShowSubscriptionForm] = useState(false)
  const [subscriptionLoading, setSubscriptionLoading] = useState(false)
  const [subscriptionError, setSubscriptionError] = useState("")
  const [subscriptionSuccess, setSubscriptionSuccess] = useState(false)

  const navigate = useNavigate()
  const isUserAuthenticated = isAuthenticated()

  // Servicios de aeronaves predefinidos que coinciden con el modelo del backend
  const defaultServices = [
    {
      id: 1,
      name: "Servicio Básico: Asistencia Esencial",
      description:
        "Incluye abastecimiento de combustible, estacionamiento en rampa para aeronaves, acceso a sala VIP básica para pasajeros, y servicios de agua potable y limpieza básica de aeronaves.",
      price: 300,
      category: "basico",
    },
    {
      id: 2,
      name: "Servicio Intermedio: Experiencia Mejorada",
      description:
        "Incluye todo lo del servicio básico, hangaraje para protección de aeronaves, catering estándar para pasajeros y tripulación, coordinación de permisos de vuelo y planificación básica, y transporte terrestre (limusina o taxi) para pasajeros.",
      price: 700,
      category: "intermedio",
    },
    {
      id: 3,
      name: "Servicio Premium: Lujo Integral",
      description:
        "Incluye todo lo del servicio intermedio, sala VIP de lujo con servicios personalizados, catering gourmet y bebidas premium, asistencia completa para tripulación, servicios de mantenimiento preventivo para aeronaves, y gestión de vuelos internacionales (aduanas y migración).",
      price: 1500,
      category: "premium",
    },
    {
      id: 4,
      name: "Servicio Ejecutivo: Solución Corporativa",
      description:
        "Diseñado específicamente para viajes de negocios. Incluye todo lo del servicio premium, más sala de conferencias privada, servicios de secretariado y traducción, conectividad de alta velocidad, coordinación de reuniones en destino y transporte ejecutivo para todo el equipo.",
      price: 2200,
      category: "ejecutivo",
    },
  ]

  // Función para inicializar los servicios en la base de datos si no existen
  const initializeServices = async () => {
    try {
      // Verificamos si ya existen servicios
      const response = await fetch(`${import.meta.env.VITE_API_URL}/services`)

      if (!response.ok) {
        throw new Error("Error al obtener servicios")
      }

      const existingServices = await response.json()

      // Si no hay servicios, creamos los predefinidos
      if (existingServices.length === 0) {
        for (const service of defaultServices) {
          await fetch(`${import.meta.env.VITE_API_URL}/services`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              name: service.name,
              description: service.description,
              price: service.price,
            }),
          })
        }

        // Volvemos a cargar los servicios después de crearlos
        const newResponse = await fetch(`${import.meta.env.VITE_API_URL}/services`)
        if (newResponse.ok) {
          const newServices = await newResponse.json()
          setServices(newServices)
        }
      } else {
        // Si ya existen servicios, los usamos
        setServices(existingServices)
      }
    } catch (error) {
      console.error("Error al inicializar servicios:", error)
      setError("Error al cargar servicios")
      // En caso de error, usamos los servicios predefinidos
      setServices(defaultServices)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    initializeServices()
  }, [])

  const handleSubscribe = (service) => {
    setSelectedService(service)
    setShowSubscriptionForm(true)
  }

  const handleSubscriptionChange = (e) => {
    const { name, value } = e.target
    setSubscriptionData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubscriptionSubmit = async (e) => {
    e.preventDefault()
    setSubscriptionError("")
    setSubscriptionSuccess(false)
    setSubscriptionLoading(true)

    try {
      const userId = getUserId()

      const response = await fetch(`${import.meta.env.VITE_API_URL}/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId,
          serviceId: selectedService.id,
          frequency: subscriptionData.frequency,
          startDate: subscriptionData.startDate,
          endDate: subscriptionData.endDate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al crear la suscripción")
      }

      setSubscriptionSuccess(true)
      setTimeout(() => {
        setShowSubscriptionForm(false)
        setSelectedService(null)
      }, 2000)
    } catch (err) {
      setSubscriptionError(err.message || "Error al crear la suscripción")
    } finally {
      setSubscriptionLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Cargando servicios...</div>
  }

  return (
    <div className="services-container">
      <h1>Nuestros Servicios para Aeronaves</h1>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.name}</h3>
            <p className="service-description">{service.description}</p>
            <p className="service-price">USD ${service.price}</p>
            <button className="subscribe-button" onClick={() => handleSubscribe(service)}>
              Suscribirse
            </button>
          </div>
        ))}
      </div>

      {showSubscriptionForm && selectedService && (
        <div className="subscription-modal">
          <div className="subscription-modal-content">
            <button className="close-modal" onClick={() => setShowSubscriptionForm(false)}>
              &times;
            </button>

            <h2>Suscripción a {selectedService.name}</h2>

            {subscriptionError && (
              <div className="alert alert-error">
                <span className="alert-icon">⚠️</span>
                <span>{subscriptionError}</span>
              </div>
            )}

            {subscriptionSuccess && (
              <div className="alert alert-success">
                <span className="alert-icon">✓</span>
                <span>¡Suscripción creada exitosamente!</span>
              </div>
            )}

            <form onSubmit={handleSubscriptionSubmit} className="subscription-form">
              <div className="form-group">
                <label htmlFor="frequency">Frecuencia</label>
                <select
                  id="frequency"
                  name="frequency"
                  value={subscriptionData.frequency}
                  onChange={handleSubscriptionChange}
                  required
                >
                  <option value="weekly">Semanal</option>
                  <option value="biweekly">Quincenal</option>
                  <option value="monthly">Mensual</option>
                  <option value="quarterly">Trimestral</option>
                  <option value="yearly">Anual</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="startDate">Fecha de Inicio</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={subscriptionData.startDate}
                  onChange={handleSubscriptionChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="endDate">Fecha de Fin</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={subscriptionData.endDate}
                  onChange={handleSubscriptionChange}
                  required
                />
              </div>

              <div className="subscription-summary">
                <p>
                  <strong>Servicio:</strong> {selectedService.name}
                </p>
                <p>
                  <strong>Precio:</strong> USD ${selectedService.price}
                </p>
              </div>

              <button type="submit" className="auth-button au-btn" disabled={subscriptionLoading}>
                {subscriptionLoading ? "Procesando..." : "Confirmar Suscripción"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

