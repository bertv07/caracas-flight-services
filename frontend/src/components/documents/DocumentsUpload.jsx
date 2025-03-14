"use client"

import { useState, useEffect } from "react"
import { getUserId } from "../../utils/authUtils"
import "../../styles/documents.css"

export default function DocumentsUpload() {
  const [documents, setDocuments] = useState({
    profilePhoto: "",
    verificationPhoto: "",
    idPhoto: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [documentId, setDocumentId] = useState(null)

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const userId = getUserId()
        const response = await fetch(`${import.meta.env.VITE_API_URL}/documents/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (response.status === 404) {
          // No hay documentos, está bien
          setInitialLoading(false)
          return
        }

        if (!response.ok) {
          throw new Error("Error al obtener documentos")
        }

        const data = await response.json()
        setDocuments({
          profilePhoto: data.profilePhoto || "",
          verificationPhoto: data.verificationPhoto || "",
          idPhoto: data.idPhoto || "",
        })
        setDocumentId(data.id)
      } catch (err) {
        if (err.message !== "Error al obtener documentos") {
          setError(err.message || "Error al cargar documentos")
        }
      } finally {
        setInitialLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setDocuments((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const userId = getUserId()
      let url, method

      if (documentId) {
        // Actualizar documentos existentes
        url = `${import.meta.env.VITE_API_URL}/documents/${documentId}`
        method = "PUT"
      } else {
        // Crear nuevos documentos
        url = `${import.meta.env.VITE_API_URL}/documents`
        method = "POST"
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...documents,
          userId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Error al guardar documentos")
      }

      if (!documentId) {
        setDocumentId(data.id)
      }

      setSuccess(true)
    } catch (err) {
      setError(err.message || "Error al guardar documentos")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return <div className="loading">Cargando documentos...</div>
  }

  return (
    <div className="documents-section">
      <h2>Documentos de Verificación</h2>

      <p className="documents-info">Para completar tu registro, necesitamos que subas los siguientes documentos:</p>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span className="alert-icon">✓</span>
          <span>Documentos guardados exitosamente</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="documents-form">
        <div className="form-group">
          <label htmlFor="profilePhoto">Foto de Perfil (URL)</label>
          <input
            type="text"
            id="profilePhoto"
            name="profilePhoto"
            value={documents.profilePhoto}
            onChange={handleChange}
            placeholder="https://ejemplo.com/foto.jpg"
            required
          />
          {documents.profilePhoto && (
            <div className="image-preview">
              <img src={documents.profilePhoto || "/placeholder.svg"} alt="Vista previa de foto de perfil" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="verificationPhoto">Foto de Verificación (URL)</label>
          <input
            type="text"
            id="verificationPhoto"
            name="verificationPhoto"
            value={documents.verificationPhoto}
            onChange={handleChange}
            placeholder="https://ejemplo.com/verificacion.jpg"
            required
          />
          {documents.verificationPhoto && (
            <div className="image-preview">
              <img src={documents.verificationPhoto || "/placeholder.svg"} alt="Vista previa de foto de verificación" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="idPhoto">Foto de Identificación (URL)</label>
          <input
            type="text"
            id="idPhoto"
            name="idPhoto"
            value={documents.idPhoto}
            onChange={handleChange}
            placeholder="https://ejemplo.com/id.jpg"
            required
          />
          {documents.idPhoto && (
            <div className="image-preview">
              <img src={documents.idPhoto || "/placeholder.svg"} alt="Vista previa de identificación" />
            </div>
          )}
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Guardando..." : documentId ? "Actualizar Documentos" : "Subir Documentos"}
        </button>
      </form>
    </div>
  )
}

