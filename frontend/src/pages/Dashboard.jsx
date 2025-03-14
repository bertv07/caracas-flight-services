"use client"

import { useState } from "react"
import { getUserId, getUserRole, getUserStatus } from "../utils/authUtils"
import LogoutButton from "../auth/LogoutButton"


export default function Dashboard() {
  const [userData, setUserData] = useState({
    id: getUserId(),
    role: getUserRole(),
    status: getUserStatus(),
  })

  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h1>Dashboard de Usuario</h1>
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
        <h2>Bienvenido a tu panel</h2>
        <p>ID de usuario: {userData.id}</p>
        <p>Rol: {userData.role}</p>
        <p>Estado: {userData.status}</p>

        {userData.status === "pending" && (
          <div
            style={{
              backgroundColor: "#fff3cd",
              color: "#856404",
              padding: "1rem",
              borderRadius: "5px",
              marginTop: "1rem",
            }}
          >
            Tu cuenta está pendiente de aprobación. Una vez aprobada, podrás acceder a todas las funcionalidades.
          </div>
        )}
      </div>
    </div>
  )
}

