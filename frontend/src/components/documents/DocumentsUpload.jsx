"use client"

import { useState, useEffect, useRef } from "react"
import { getUserId } from "../../utils/authUtils"
import "../../styles/documents.css"

export default function DocumentsUpload() {
  const API_URL = "http://localhost:3000" // URL directa del servidor
  const [documents, setDocuments] = useState({
    profilePhoto: null,
    verificationPhoto: null,
    idPhoto: null,
  })

  const [previews, setPreviews] = useState({
    profilePhoto: "",
    verificationPhoto: "",
    idPhoto: "",
  })

  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [documentId, setDocumentId] = useState(null)

  // Referencias para los inputs de archivo
  const profilePhotoRef = useRef(null)
  const verificationPhotoRef = useRef(null)
  const idPhotoRef = useRef(null)

  useEffect(() => {
    // Limpiar URLs de previsualización al desmontar
    return () => {
      Object.values(previews).forEach(url => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url)
      })
    }
  }, [])

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const userId = getUserId()
        const response = await fetch(`${API_URL}/api/documents/user/${userId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })

        if (response.status === 404) {
          setInitialLoading(false)
          return
        }

        if (!response.ok) throw new Error("Error al obtener documentos")

        const data = await response.json()
        
        // Construir URLs completas para las imágenes existentes
        setPreviews({
          profilePhoto: data.profilePhoto ? `${API_URL}${data.profilePhoto}` : "",
          verificationPhoto: data.verificationPhoto ? `${API_URL}${data.verificationPhoto}` : "",
          idPhoto: data.idPhoto ? `${API_URL}${data.idPhoto}` : "",
        })

        setDocumentId(data.id)
      } catch (err) {
        setError(err.message || "Error al cargar documentos")
      } finally {
        setInitialLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files?.[0]) {
      setDocuments(prev => ({ ...prev, [name]: files[0] }))
      setPreviews(prev => ({ 
        ...prev, 
        [name]: URL.createObjectURL(files[0]) 
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("userId", getUserId())

      // Agregar solo archivos nuevos
      if (documents.profilePhoto) formData.append("profilePhoto", documents.profilePhoto)
      if (documents.verificationPhoto) formData.append("verificationPhoto", documents.verificationPhoto)
      if (documents.idPhoto) formData.append("idPhoto", documents.idPhoto)

      const url = documentId 
        ? `${API_URL}/api/documents/${documentId}`
        : `${API_URL}/api/documents`

      const response = await fetch(url, {
        method: documentId ? "PUT" : "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Error al guardar documentos")

      setDocumentId(data.id || documentId)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const triggerFileInput = (inputRef) => inputRef.current.click()

  if (initialLoading) return <div className="loading">Cargando documentos...</div>

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
        {['profilePhoto', 'verificationPhoto', 'idPhoto'].map((type) => (
          <div key={type} className="form-group">
            <label>{{
              profilePhoto: "Foto de Perfil",
              verificationPhoto: "Foto de Verificación",
              idPhoto: "Foto de Identificación"
            }[type]}</label>

            <input
              type="file"
              ref={eval(`${type}Ref`)}
              id={type}
              name={type}
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <div className="file-upload-container">
              <button
                type="button"
                className="file-upload-button"
                onClick={() => triggerFileInput(eval(`${type}Ref`))}
              >
                Seleccionar Imagen
              </button>
              <span className="file-name">
                {documents[type]?.name || "Ningún archivo seleccionado"}
              </span>
            </div>

            {previews[type] && (
              <div className="image-preview">
                <img 
                  src={previews[type]} 
                  alt={`Vista previa de ${type}`}
                  onLoad={() => {
                    if (previews[type].startsWith('blob:')) {
                      URL.revokeObjectURL(previews[type])
                    }
                  }}
                />
              </div>
            )}
          </div>
        ))}

        <button type="submit" className="auth-button au-btn" disabled={loading}>
          {loading ? "Guardando..." : documentId ? "Actualizar Documentos" : "Subir Documentos"}
        </button>
      </form>
    </div>
  )
}