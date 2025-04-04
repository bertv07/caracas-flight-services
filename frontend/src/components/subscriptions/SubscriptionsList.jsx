import { useState, useEffect } from "react"
import { getUserId } from "../../utils/authUtils"
import "../../styles/subscriptions.css"

export default function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cancelMessage, setCancelMessage] = useState(null)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      const userId = getUserId()
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscriptions/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (!response.ok) {
        throw new Error("Error al cargar suscripciones")
      }
      const data = await response.json()
      console.log("Suscripciones recibidas:", data)
      
      // Filter out subscriptions with status "cancel" or "cancelled"
      const filteredSubscriptions = data.filter(
        sub => sub.status !== "cancel" && sub.status !== "cancelled"
      )
      
      setSubscriptions(filteredSubscriptions)
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
    // Usar un valor predeterminado si status es undefined
    const statusValue = status || "pending"
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
      cancel: {
        bg: "#e2e3e5",
        color: "#383d41",
        text: "Cancelado",
      },
      cancelled: {
        bg: "#e2e3e5",
        color: "#383d41",
        text: "Cancelado",
      },
    }
    const style = statusStyles[statusValue] || statusStyles.pending
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

  const handleCancelSubscription = async (subscriptionId) => {
    if (!confirm("¿Está seguro que desea cancelar esta suscripción?")) {
      return
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscriptions/${subscriptionId}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      if (!response.ok) {
        throw new Error("Error al cancelar la suscripción")
      }
      
      // Show cancellation message
      setCancelMessage({
        id: subscriptionId,
        message: "Se ha cancelado la suscripción.",
      })
      
      // Remove the cancelled subscription from the list immediately
      setSubscriptions(prevSubscriptions => 
        prevSubscriptions.filter(sub => sub.id !== subscriptionId)
      )
      
      // Clear the cancel message after 3 seconds
      setTimeout(() => {
        setCancelMessage(null)
      }, 3000)
    } catch (err) {
      console.error("Error:", err)
      setError("Error al cancelar la suscripción. Por favor, inténtelo de nuevo.")
    }
  }

  return (
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
                <h3>{subscription.Service?.name || "Servicio"}</h3>
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
                  <strong>Precio:</strong> ${subscription.Service?.price || 0}
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
                {subscription.status === "approved" && (
                  <div className="approved-message">
                    <p>Su suscripción está activa y aprobada.</p>
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
                  <button className="cancel-subscription-btn" onClick={() => handleCancelSubscription(subscription.id)}>
                    Cancelar suscripción
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {/* Show the cancel message as a floating notification */}
      {cancelMessage && (
        <div
          className="cancel-notification"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "15px",
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <p>{cancelMessage.message}</p>
        </div>
      )}
    </div>
  )
}
