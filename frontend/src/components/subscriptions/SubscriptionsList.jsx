"use client"

import { useState, useEffect } from "react"
import { getUserId } from "../../utils/authUtils"
import { Link } from "react-router-dom"
import "../../styles/subscriptions.css"

export default function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const userId = getUserId()
        const response = await fetch(`${import.meta.env.VITE_API_URL}/subscriptions/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Error al obtener suscripciones")
        }

        const data = await response.json()
        setSubscriptions(data)
      } catch (err) {
        setError(err.message || "Error al cargar suscripciones")
      } finally {
        setLoading(false)
      }
    }

    fetchSubscriptions()
  }, [])

  const handleCancelSubscription = async (subscriptionId) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta suscripción?")) {
      return
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/subscriptions/${subscriptionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al cancelar la suscripción")
      }

      // Actualizar la lista de suscripciones
      setSubscriptions(subscriptions.filter((sub) => sub.id !== subscriptionId))
    } catch (err) {
      setError(err.message || "Error al cancelar la suscripción")
    }
  }

  if (loading) {
    return <div className="loading">Cargando suscripciones...</div>
  }

  return (
    <div className="subscriptions-section">
      <div className="subscriptions-header">
        <h2>Mis Suscripciones</h2>
        <Link to="/services" className="add-subscription-button">
          Agregar Suscripción
        </Link>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {subscriptions.length === 0 ? (
        <div className="no-subscriptions">
          <p>No tienes suscripciones activas.</p>
          <Link to="/services" className="auth-button">
            Ver Servicios Disponibles
          </Link>
        </div>
      ) : (
        <div className="subscriptions-list">
          {subscriptions.map((subscription) => (
            <div key={subscription.id} className="subscription-card">
              <div className="subscription-info">
                <h3>{subscription.Service.name}</h3>
                <p className="subscription-description">{subscription.Service.description}</p>
                <div className="subscription-details">
                  <p>
                    <strong>Frecuencia:</strong> {subscription.frequency}
                  </p>
                  <p>
                    <strong>Inicio:</strong> {new Date(subscription.startDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Fin:</strong> {new Date(subscription.endDate).toLocaleDateString()}
                  </p>
                  <p className="subscription-price">
                    <strong>Precio:</strong> ${subscription.Service.price}
                  </p>
                </div>
              </div>
              <div className="subscription-actions">
                <button
                  className="cancel-subscription-button"
                  onClick={() => handleCancelSubscription(subscription.id)}
                >
                  Cancelar Suscripción
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

