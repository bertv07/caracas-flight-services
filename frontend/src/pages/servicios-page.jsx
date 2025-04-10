"use client"

import { useState, useEffect } from "react"
import LogoutButton from "../components/auth/LogoutButton"
import NavBar from "../components/auth/navBarAuth"
import SubscriptionApproval from "../components/admin/SubscriptionApproval"
import "../styles/admin.css"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  // Estados para documentos
  const [showDocumentsModal, setShowDocumentsModal] = useState(false)
  const [selectedUserDocuments, setSelectedUserDocuments] = useState(null)
  const [loadingDocuments, setLoadingDocuments] = useState(false)
  const [documentError, setDocumentError] = useState(null)
  // Estados para suscripciones
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false)
  const [selectedUserSubscriptions, setSelectedUserSubscriptions] = useState(null)
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false)
  const [subscriptionError, setSubscriptionError] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers()
    }
  }, [activeTab])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No hay token de autenticación")
      }
      const response = await fetch(`${API_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`Error al cargar usuarios: ${response.status}`)
      }
      const data = await response.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveUser = async (userId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/admin/users/${userId}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Error al aprobar usuario")
      }
      // Actualizar la lista de usuarios
      fetchUsers()
    } catch (error) {
      setError(error.message)
    }
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setShowEditModal(true)
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/admin/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          role: editingUser.role,
          status: editingUser.status,
        }),
      })
      if (!response.ok) {
        throw new Error("Error al actualizar usuario")
      }
      setShowEditModal(false)
      fetchUsers()
    } catch (error) {
      setError(error.message)
    }
  }

  // Función para ver documentos de un usuario
  const handleViewDocuments = async (userId, username) => {
    try {
      setLoadingDocuments(true)
      setDocumentError(null)
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/documents/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        if (response.status === 404) {
          setSelectedUserDocuments({
            userId,
            username,
            documents: null,
          })
        } else {
          throw new Error(`Error al cargar documentos: ${response.status}`)
        }
      } else {
        const data = await response.json()
        setSelectedUserDocuments({
          userId,
          username,
          documents: data,
        })
      }
      setShowDocumentsModal(true)
    } catch (err) {
      setDocumentError(err.message)
    } finally {
      setLoadingDocuments(false)
    }
  }

  // Función para descargar un documento
  const handleDownloadDocument = async (documentUrl, documentName) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}${documentUrl}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`Error al descargar documento: ${response.status}`)
      }
      // Convertir la respuesta a blob
      const blob = await response.blob()
      // Crear un objeto URL para el blob
      const url = window.URL.createObjectURL(blob)
      // Crear un elemento <a> para descargar
      const a = document.createElement("a")
      a.href = url
      a.download = documentName
      document.body.appendChild(a)
      a.click()
      // Limpiar
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      setDocumentError(err.message)
    }
  }

  // Función para ver suscripciones de un usuario
  const handleViewSubscriptions = async (userId, username) => {
    try {
      setLoadingSubscriptions(true)
      setSubscriptionError(null)
      setSuccessMessage("")
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/subscriptions/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`Error al cargar suscripciones: ${response.status}`)
      }
      const data = await response.json()
      setSelectedUserSubscriptions({
        userId,
        username,
        subscriptions: data,
      })
      setShowSubscriptionsModal(true)
    } catch (err) {
      setSubscriptionError(err.message)
    } finally {
      setLoadingSubscriptions(false)
    }
  }

  // Función para aprobar una suscripción
  const handleApproveSubscription = async (subscriptionId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/admin/approve-subscription/${subscriptionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Error al aprobar suscripción")
      }
      // Actualizar la lista de suscripciones
      if (selectedUserSubscriptions) {
        const updatedSubscriptions = selectedUserSubscriptions.subscriptions.map((sub) => {
          if (sub.id === subscriptionId) {
            return { ...sub, status: "approved" }
          }
          return sub
        })
        setSelectedUserSubscriptions({
          ...selectedUserSubscriptions,
          subscriptions: updatedSubscriptions,
        })
      }
      setSuccessMessage("Suscripción aprobada exitosamente")
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      setSubscriptionError(error.message)
      // Limpiar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setSubscriptionError("")
      }, 3000)
    }
  }

  // Función para rechazar una suscripción
  const handleRejectSubscription = async (subscriptionId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/admin/reject-subscription/${subscriptionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Error al rechazar suscripción")
      }
      // Actualizar la lista de suscripciones
      if (selectedUserSubscriptions) {
        const updatedSubscriptions = selectedUserSubscriptions.subscriptions.map((sub) => {
          if (sub.id === subscriptionId) {
            return { ...sub, status: "rejected" }
          }
          return sub
        })
        setSelectedUserSubscriptions({
          ...selectedUserSubscriptions,
          subscriptions: updatedSubscriptions,
        })
      }
      setSuccessMessage("Suscripción rechazada exitosamente")
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      setSubscriptionError(error.message)
      // Limpiar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setSubscriptionError("")
      }, 3000)
    }
  }

  // Función para cancelar una suscripción
  const handleCancelSubscription = async (subscriptionId) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/api/subscriptions/${subscriptionId}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Error al cancelar suscripción")
      }
      // Actualizar la lista de suscripciones
      if (selectedUserSubscriptions) {
        const updatedSubscriptions = selectedUserSubscriptions.subscriptions.map((sub) => {
          if (sub.id === subscriptionId) {
            return { ...sub, status: "cancel" }
          }
          return sub
        })
        setSelectedUserSubscriptions({
          ...selectedUserSubscriptions,
          subscriptions: updatedSubscriptions,
        })
      }
      setSuccessMessage("Suscripción cancelada exitosamente")
      // Limpiar el mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (error) {
      setSubscriptionError(error.message)
      // Limpiar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setSubscriptionError("")
      }, 3000)
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
        className="status-badge"
        style={{
          backgroundColor: style.bg,
          color: style.color,
        }}
      >
        {style.text}
      </span>
    )
  }

  const renderUsersTab = () => {
    return (
      <div className="admin-panel-section">
        <h2>Gestión de Usuarios</h2>
        {loading && <p>Cargando usuarios...</p>}
        {error && <div className="error-message">{error}</div>}
        {!loading && !error && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Documentos</th>
                <th>Suscripciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td>
                      <a
                        href="#"
                        className="view-link"
                        onClick={(e) => {
                          e.preventDefault()
                          handleViewDocuments(user.id, user.username)
                        }}
                      >
                        Ver documentos
                      </a>
                    </td>
                    <td>
                      <a
                        href="#"
                        className="view-link"
                        onClick={(e) => {
                          e.preventDefault()
                          handleViewSubscriptions(user.id, user.username)
                        }}
                      >
                        Ver suscripciones
                      </a>
                    </td>
                    <td>
                      <div className="action-buttons">
                      <button className="btn-approve" onClick={() => handleApproveUser(user.id)}>
                            Aprobar
                          </button>
                        )
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">
                    No hay usuarios para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    )
  }

  return (
    <div>
      <NavBar />
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Panel de Administración</h1>
          <LogoutButton />
        </div>
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "users" ? "active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            Usuarios
          </button>
          <button
            className={`admin-tab ${activeTab === "subscriptions" ? "active" : ""}`}
            onClick={() => setActiveTab("subscriptions")}
          >
            Suscripciones
          </button>
        </div>
        <div className="admin-content">
          {activeTab === "users" && renderUsersTab()}
          {activeTab === "subscriptions" && <SubscriptionApproval />}
        </div>
      </div>
      {/* Modal de edición de usuario */}
      {showEditModal && editingUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Editar Usuario</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="form-group">
                <label>Nombre:</label>
                <p>
                  {editingUser.firstName} {editingUser.lastName}
                </p>
              </div>
              <div className="form-group">
                <label>Usuario:</label>
                <p>{editingUser.username}</p>
              </div>
              <div className="form-group">
                <label htmlFor="role">Rol:</label>
                <select
                  id="role"
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                >
                  <option value="user">Usuario</option>
                  <option value="pilot">Piloto</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="status">Estado:</label>
                <select
                  id="status"
                  value={editingUser.status}
                  onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                >
                  <option value="pending">Pendiente</option>
                  <option value="active">Activo</option>
                  <option value="suspended">Suspendido</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setShowEditModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-save">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal para ver documentos */}
      {showDocumentsModal && selectedUserDocuments && (
        <div className="modal-overlay">
          <div className="modal-content documents-modal">
            <h2>Documentos de {selectedUserDocuments.username}</h2>
            {loadingDocuments ? (
              <p>Cargando documentos...</p>
            ) : documentError ? (
              <div className="error-message">{documentError}</div>
            ) : !selectedUserDocuments.documents ? (
              <p>Este usuario no tiene documentos registrados.</p>
            ) : (
              <div className="documents-container">
                <div className="document-card">
                  <h3>Foto de Perfil</h3>
                  <div className="document-preview">
                    <img
                      src={`${API_URL}${selectedUserDocuments.documents.profilePhoto}`}
                      alt="Foto de perfil"
                    />
                  </div>
                  <button
                    className="btn-download"
                    onClick={() =>
                      handleDownloadDocument(
                        selectedUserDocuments.documents.profilePhoto,
                        `perfil_${selectedUserDocuments.username}.jpg`,
                      )
                    }
                  >
                    Descargar
                  </button>
                </div>
                <div className="document-card">
                  <h3>Foto de Verificación</h3>
                  <div className="document-preview">
                    <img
                      src={`${API_URL}${selectedUserDocuments.documents.verificationPhoto}`}
                      alt="Foto de verificación"
                    />
                  </div>
                  <button
                    className="btn-download"
                    onClick={() =>
                      handleDownloadDocument(
                        selectedUserDocuments.documents.verificationPhoto,
                        `verificacion_${selectedUserDocuments.username}.jpg`,
                      )
                    }
                  >
                    Descargar
                  </button>
                </div>
                <div className="document-card">
                  <h3>Foto de Identificación</h3>
                  <div className="document-preview">
                    <img
                      src={`${API_URL}${selectedUserDocuments.documents.idPhoto}`}
                      alt="Foto de identificación"
                    />
                  </div>
                  <button
                    className="btn-download"
                    onClick={() =>
                      handleDownloadDocument(
                        selectedUserDocuments.documents.idPhoto,
                        `identificacion_${selectedUserDocuments.username}.jpg`,
                      )
                    }
                  >
                    Descargar
                  </button>
                </div>
              </div>
            )}
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowDocumentsModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal para ver suscripciones */}
      {showSubscriptionsModal && selectedUserSubscriptions && (
        <div className="modal-overlay">
          <div className="modal-content subscriptions-modal">
            <h2>Suscripciones de {selectedUserSubscriptions.username}</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {subscriptionError && <div className="error-message">{subscriptionError}</div>}
            {loadingSubscriptions ? (
              <p>Cargando suscripciones...</p>
            ) : selectedUserSubscriptions.subscriptions.length === 0 ? (
              <p>Este usuario no tiene suscripciones registradas.</p>
            ) : (
              <div className="subscriptions-container">
                <table className="subscriptions-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Servicio</th>
                      <th>Frecuencia</th>
                      <th>Método de Pago</th>
                      <th>Fecha Inicio</th>
                      <th>Fecha Fin</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUserSubscriptions.subscriptions.map((subscription) => (
                      <tr key={subscription.id}>
                        <td>{subscription.id}</td>
                        <td>{subscription.Service?.name || "Desconocido"}</td>
                        <td>{subscription.frequency}</td>
                        <td>{getPaymentMethodName(subscription.paymentMethod)}</td>
                        <td>{formatDate(subscription.startDate)}</td>
                        <td>{formatDate(subscription.endDate)}</td>
                        <td>{getStatusBadge(subscription.status)}</td>
                        <td>
                          <div className="subscription-actions">
                            {subscription.status === "pending" && (
                              <>
                                <button
                                  className="btn-approve-sub"
                                  onClick={() => handleApproveSubscription(subscription.id)}
                                >
                                  Aprobar
                                </button>
                                <button
                                  className="btn-reject-sub"
                                  onClick={() => handleRejectSubscription(subscription.id)}
                                >
                                  Rechazar
                                </button>
                              </>
                            )}
                            {subscription.status === "rejected" && (
                              <button
                                className="btn-approve-sub"
                                onClick={() => handleApproveSubscription(subscription.id)}
                              >
                                Aprobar
                              </button>
                            )}
                            {subscription.status === "approved" && (
                              <button
                                className="btn-cancel-sub"
                                onClick={() => handleCancelSubscription(subscription.id)}
                              >
                                Cancelar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="modal-actions">
              <button className="btn-cancel" onClick={() => setShowSubscriptionsModal(false)}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
