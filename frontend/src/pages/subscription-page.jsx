"use client"

import { useState, useEffect } from "react"
import { getUserId } from "../utils/authUtils"
import NavBar from "../components/auth/navBarAuth"
import "../styles/subscriptions.css"

export default function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const userId = getUserId()
      setLoading(true)

      const response = await fetch(`http://localhost:3000/api/subscriptions/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al cargar suscripciones")
      }

      const data = await response.json()
      setSubscriptions(data)
    } catch (err) {
      console.error("Error:", err)
      setError("Error al cargar sus suscripciones. Por favor, inténtelo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      approved: {
        bg: "#d4edda",
        color: "#155724",
        text: "Aprobado",
      },
      pending: {
        bg: "#fff3cd",
        color: "#856404",
        text: "Pendiente",
      },
      rejected: {
        bg: "#f8d7da",
        color: "#721c24",
        text: "Rechazado",
      },
    }

    const style = statusStyles[status] || statusStyles.pending

    return (
      <span
        style={{
          backgroundColor: style.bg,
          color: style.color,
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          fontSize: "0.875rem",
          fontWeight: "500",
        }}
      >
        {style.text}
      </span>
    )
  }

  const getPaymentMethodName = (method) => {
    const methods = {
      paypal: "PayPal",
      pagomovil: "Pago Móvil",
      efectivo: "Efectivo",
    }
    return methods[method] || method
  }

  return (
    <div>
      <NavBar />
      <div className="subscriptions-container">
        <h2>Mis Suscripciones</h2>

        {loading ? (
          <p>Cargando suscripciones...</p>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : subscriptions.length === 0 ? (
          <div className="empty-subscriptions">
            <p>No tienes suscripciones activas.</p>
            <a href="/servicios" className="browse-services-btn">
              Ver servicios disponibles
            </a>
          </div>
        ) : (
          <div className="subscriptions-list">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="subscription-card">
                <div className="subscription-header">
                  <h3>{subscription.Service?.titulo || "Servicio"}</h3>
                  {getStatusBadge(subscription.status)}
                </div>

                <div className="subscription-details">
                  <p>
                    <strong>Frecuencia:</strong> {subscription.frequency}
                  </p>
                  <p>
                    <strong>Método de pago:</strong> {getPaymentMethodName(subscription.paymentMethod)}
                  </p>
                  <p>
                    <strong>Fecha de inicio:</strong> {formatDate(subscription.startDate)}
                  </p>
                  <p>
                    <strong>Fecha de fin:</strong> {formatDate(subscription.endDate)}
                  </p>
                  <p>
                    <strong>Precio:</strong> {subscription.Service?.precio || `USD $${subscription.Service?.price}`}
                  </p>

                  {subscription.status === "pending" && (
                    <div className="pending-message">
                      <p>
                        {subscription.paymentMethod === "paypal"
                          ? "Su pago está siendo procesado."
                          : subscription.paymentMethod === "pagomovil"
                            ? "Su pago móvil está pendiente de verificación por un administrador."
                            : "Su solicitud de pago en efectivo está pendiente de confirmación."}
                      </p>
                    </div>
                  )}

                  {subscription.status === "rejected" && (
                    <div className="rejected-message">
                      <p>Su suscripción ha sido rechazada. Por favor, contacte con soporte para más información.</p>
                    </div>
                  )}
                </div>

                {subscription.status === "approved" && (
                  <div className="subscription-actions">
                    <button className="cancel-subscription-btn">Cancelar suscripción</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

