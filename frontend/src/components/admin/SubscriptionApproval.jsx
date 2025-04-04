"use client"

import { useState, useEffect } from "react"
import "../../styles/auth.css"
import "../../styles/admin.css"

export default function SubscriptionApproval() {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  // Añadir estados para el modal de detalles
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [userSubscriptions, setUserSubscriptions] = useState([])
  const [loadingUserSubscriptions, setLoadingUserSubscriptions] = useState(false)

  useEffect(() => {
    fetchPendingSubscriptions()
  }, [])

  const fetchPendingSubscriptions = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/pending-subscriptions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al cargar suscripciones pendientes")
      }

      const data = await response.json()
      setSubscriptions(data)
    } catch (err) {
      console.error("Error:", err)
      setError("Error al cargar las suscripciones pendientes. Por favor, inténtelo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleApproveSubscription = async (subscriptionId) => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/approve-subscription/${subscriptionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al aprobar la suscripción")
      }

      // Actualizar la lista de suscripciones pendientes
      setSubscriptions(subscriptions.filter((sub) => sub.id !== subscriptionId))
      setSuccessMessage("Suscripción aprobada exitosamente")

      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (err) {
      console.error("Error:", err)
      setError("Error al aprobar la suscripción. Por favor, inténtelo de nuevo.")

      // Limpiar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setError("")
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  const handleRejectSubscription = async (subscriptionId) => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/reject-subscription/${subscriptionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al rechazar la suscripción")
      }

      // Actualizar la lista de suscripciones pendientes
      setSubscriptions(subscriptions.filter((sub) => sub.id !== subscriptionId))
      setSuccessMessage("Suscripción rechazada exitosamente")

      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (err) {
      console.error("Error:", err)
      setError("Error al rechazar la suscripción. Por favor, inténtelo de nuevo.")

      // Limpiar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setError("")
      }, 3000)
    } finally {
      setLoading(false)
    }
  }

  // Añadir función para obtener suscripciones de un usuario
  const fetchUserSubscriptions = async (userId, username) => {
    try {
      setLoadingUserSubscriptions(true)
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/subscriptions/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Error al cargar suscripciones del usuario")
      }

      const data = await response.json()
      setUserSubscriptions(data)
      setSelectedUser({ id: userId, username })
      setShowDetailsModal(true)
    } catch (err) {
      console.error("Error:", err)
      setError("Error al cargar las suscripciones del usuario. Por favor, inténtelo de nuevo.")
    } finally {
      setLoadingUserSubscriptions(false)
    }
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const getPaymentMethodName = (method) => {
    const methods = {
      paypal: "PayPal",
      pagomovil: "Pago Móvil",
      efectivo: "Efectivo",
    }
    return methods[method] || method
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

  const viewPaymentDetails = (details) => {
    try {
      const parsedDetails = typeof details === "string" ? JSON.parse(details) : details

      let formattedDetails = ""

      if (parsedDetails.paymentMethod === "pagomovil") {
        formattedDetails = `
          Nombre: ${parsedDetails.nombre || "No especificado"}
          Teléfono: ${parsedDetails.telefono || "No especificado"}
          Cédula: ${parsedDetails.cedula || "No especificado"}
          Referencia: ${parsedDetails.referencia || "No especificado"}
        `
      } else if (parsedDetails.paymentMethod === "efectivo") {
        formattedDetails = `
          Dirección de entrega: ${parsedDetails.direccionEntrega || "No especificado"}
          Fecha de entrega: ${parsedDetails.fechaEntrega || "No especificado"}
          Hora de entrega: ${parsedDetails.horaEntrega || "No especificado"}
        `
      } else if (parsedDetails.paymentMethod === "paypal") {
        formattedDetails = `
          ID de orden PayPal: ${parsedDetails.paypalOrderId || "No especificado"}
          Frecuencia: ${parsedDetails.frequency || "No especificado"}
        `
      } else {
        formattedDetails = JSON.stringify(parsedDetails, null, 2)
      }

      alert(formattedDetails)
    } catch (error) {
      console.error("Error al procesar detalles de pago:", error)
      alert("No se pudieron mostrar los detalles del pago.")
    }
  }

  return (
    <div className="admin-subscriptions-container">
      <h2 style={{ marginBottom: "1.5rem" }}>Suscripciones Pendientes de Aprobación</h2>

      {successMessage && (
        <div
          style={{
            backgroundColor: "#d4edda",
            color: "#155724",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          {successMessage}
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1rem",
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <p>Cargando suscripciones pendientes...</p>
      ) : subscriptions.length === 0 ? (
        <p>No hay suscripciones pendientes de aprobación.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>ID</th>
                <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>Usuario</th>
                <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>Servicio</th>
                <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                  Método de Pago
                </th>
                <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>Detalles</th>
                <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>Fecha</th>
                <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>{subscription.id}</td>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                    {subscription.User?.username || "Usuario desconocido"}
                    <button
                      onClick={() => fetchUserSubscriptions(subscription.userId, subscription.User?.username)}
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--color-green)",
                        border: "none",
                        textDecoration: "underline",
                        cursor: "pointer",
                        marginLeft: "0.5rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      Ver suscripciones
                    </button>
                  </td>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                    {subscription.Service?.titulo || "Servicio desconocido"}
                  </td>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                    {getPaymentMethodName(subscription.paymentMethod)}
                  </td>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                    <button
                      onClick={() => viewPaymentDetails(subscription.paymentDetails)}
                      style={{
                        backgroundColor: "transparent",
                        color: "var(--color-green)",
                        border: "none",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Ver detalles
                    </button>
                  </td>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                    {formatDate(subscription.createdAt)}
                  </td>
                  <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => handleApproveSubscription(subscription.id)}
                        style={{
                          backgroundColor: "#28a745",
                          color: "white",
                          border: "none",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                          marginRight: "0.5rem",
                        }}
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleRejectSubscription(subscription.id)}
                        style={{
                          backgroundColor: "#dc3545",
                          color: "white",
                          border: "none",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Rechazar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para ver todas las suscripciones de un usuario */}
      {showDetailsModal && selectedUser && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              maxWidth: "800px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>Suscripciones de {selectedUser.username}</h2>

            {loadingUserSubscriptions ? (
              <p>Cargando suscripciones...</p>
            ) : userSubscriptions.length === 0 ? (
              <p>Este usuario no tiene suscripciones.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>ID</th>
                      <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                        Servicio
                      </th>
                      <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                        Frecuencia
                      </th>
                      <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                        Método de Pago
                      </th>
                      <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                        Fecha Inicio
                      </th>
                      <th style={{ textAlign: "left", padding: "0.75rem", borderBottom: "1px solid #ddd" }}>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userSubscriptions.map((sub) => (
                      <tr key={sub.id}>
                        <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>{sub.id}</td>
                        <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                          {sub.Service?.name || "Desconocido"}
                        </td>
                        <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>{sub.frequency}</td>
                        <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                          {getPaymentMethodName(sub.paymentMethod)}
                        </td>
                        <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                          {formatDate(sub.startDate)}
                        </td>
                        <td style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}>
                          {getStatusBadge(sub.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ marginTop: "1.5rem", textAlign: "right" }}>
              <button
                onClick={() => setShowDetailsModal(false)}
                style={{
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

