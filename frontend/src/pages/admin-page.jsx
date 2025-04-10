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
  // Nuevos estados para documentos
  const [showDocumentsModal, setShowDocumentsModal] = useState(false)
  const [selectedUserDocuments, setSelectedUserDocuments] = useState(null)
  const [loadingDocuments, setLoadingDocuments] = useState(false)
  const [documentError, setDocumentError] = useState(null)

  const API_URL = import.meta.env.VITE_API_URL

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

  // Nueva función para ver documentos de un usuario
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
                      <div className="action-buttons">
                        <button className="btn-edit" onClick={() => handleEditUser(user)}>
                          Editar
                        </button>
                        {user.status === "pending" && (
                          <button className="btn-approve" onClick={() => handleApproveUser(user.id)}>
                            Aprobar
                          </button>
                        )}
                        <button className="btn-view-docs" onClick={() => handleViewDocuments(user.id, user.username)}>
                          Ver Documentos
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
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
    </div>
  )
}
