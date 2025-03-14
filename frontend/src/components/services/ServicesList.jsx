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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/services`)

        if (!response.ok) {
          throw new Error("Error al obtener servicios")
        }

        const data = await response.json()
        setServices(data)
      } catch (err) {
        setError(err.message || "Error al cargar servicios")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleSubscribe = (service) => {
    if (!isUserAuthenticated) {
      navigate("/login")
      return
    }

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
          ...subscriptionData,
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
      <h1>Nuestros Servicios</h1>

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
            <p className="service-price">${service.price}</p>
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
                  <strong>Precio:</strong> ${selectedService.price}
                </p>
              </div>

              <button type="submit" className="auth-button" disabled={subscriptionLoading}>
                {subscriptionLoading ? "Procesando..." : "Confirmar Suscripción"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

