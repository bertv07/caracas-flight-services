"use client"

import { useState } from "react"
import { getUserRole } from "../utils/authUtils"
import EditProfileForm from "../components/profile/EditProfileForm"
import ChangePasswordForm from "../components/profile/ChangePasswordForm"
import DocumentsUpload from "../components/documents/DocumentsUpload"
import SubscriptionsList from "../components/subscriptions/SubscriptionsList"
import LogoutButton from "../components/auth/LogoutButton"
import "../styles/profile.css"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile")
  const userRole = getUserRole()

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <h2>Mi Cuenta</h2>
        <ul className="profile-nav">
          <li>
            <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
              Perfil
            </button>
          </li>
          <li>
            <button className={activeTab === "password" ? "active" : ""} onClick={() => setActiveTab("password")}>
              Contraseña
            </button>
          </li>
          <li>
            <button className={activeTab === "documents" ? "active" : ""} onClick={() => setActiveTab("documents")}>
              Documentos
            </button>
          </li>
          <li>
            <button
              className={activeTab === "subscriptions" ? "active" : ""}
              onClick={() => setActiveTab("subscriptions")}
            >
              Suscripciones
            </button>
          </li>
          {userRole === "admin" && (
            <li>
              <a href="/admin/dashboard" className="admin-link">
                Panel de Administración
              </a>
            </li>
          )}
          <li className="logout-container">
            <LogoutButton />
          </li>
        </ul>
      </div>

      <div className="profile-content">
        {activeTab === "profile" && <EditProfileForm />}
        {activeTab === "password" && <ChangePasswordForm />}
        {activeTab === "documents" && <DocumentsUpload />}
        {activeTab === "subscriptions" && <SubscriptionsList />}
      </div>
    </div>
  )
}

