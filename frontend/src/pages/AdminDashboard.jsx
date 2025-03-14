"use client"

import { useState, useEffect } from "react"
import LogoutButton from "../auth/LogoutButton"

export default function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Aquí deberías tener un endpoint para obtener todos los usuarios
        const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!response.ok) {
          throw new Error("Error al cargar usuarios")
        }

        const data = await response.json()
        setUsers(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Panel de Administración</h1>
        <LogoutButton />
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Gestión de Usuarios</h2>

        {loading && <p>Cargando usuarios...</p>}

        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "1rem",
              borderRadius: "5px",
              marginTop: "1rem",
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ddd" }}>ID</th>
                <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ddd" }}>Nombre</th>
                <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ddd" }}>Usuario</th>
                <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ddd" }}>Rol</th>
                <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ddd" }}>Estado</th>
                <th style={{ textAlign: "left", padding: "0.5rem", borderBottom: "1px solid #ddd" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>{user.id}</td>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>
                      {user.firstName} {user.lastName}
                    </td>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>{user.username}</td>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>{user.role}</td>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>{user.status}</td>
                    <td style={{ padding: "0.5rem", borderBottom: "1px solid #ddd" }}>
                      <button
                        style={{
                          backgroundColor: "var(--color-green)",
                          color: "white",
                          border: "none",
                          padding: "0.3rem 0.8rem",
                          borderRadius: "4px",
                          marginRight: "0.5rem",
                          cursor: "pointer",
                        }}
                      >
                        Editar
                      </button>
                      {user.status === "pending" && (
                        <button
                          style={{
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            padding: "0.3rem 0.8rem",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Aprobar
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                    No hay usuarios para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

