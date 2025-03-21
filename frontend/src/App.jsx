"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { isAuthenticated, getUserRole } from "./utils/authUtils"

// Componentes principales
import BarraNavegacion from "./components/barra-navegacion"
import SeccionPrincipal from "./components/seccion-principal"
import SeccionServicios from "./components/seccion-servicios"
import CarruselLogos from "./components/carrusel-logos"
import SeccionNosotros from "./components/seccion-nosotros"
import PorQueElegirnos from "./components/por-que-elegirnos"
import SeccionUbicacion from "./components/seccion-ubicacion"
import FormularioContacto from "./components/formulario-contacto"

// Páginas de autenticación
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ProfilePage from "./pages/ProfilePage"
import AdminDashboard from "./pages/AdminDashboard"
import ServiciosPage from "./pages/ServiciosPage"

// Estilos y utilidades
import "./assets/css/responsive.css"
import { initAnimations, cleanupAnimations, createResponsiveTriggers } from "./utils/animations"

// Componente para rutas protegidas
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const authenticated = isAuthenticated()
  const userRole = getUserRole()

  // Si no está autenticado, redirigir al login
  if (!authenticated) {
    return <Navigate to="/login" replace />
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirigir
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

// Componente para la página principal
const HomePage = () => {
  useEffect(() => {
    // Inicializar animaciones cuando el componente se monta
    initAnimations()
    const cleanupTriggers = createResponsiveTriggers()

    // Verificar si estamos en un entorno de navegador
    if (typeof window !== "undefined") {
      // Forzar un reflow para asegurar que los estilos se apliquen correctamente
      window.addEventListener("resize", () => {
        document.body.style.display = "none"
        document.body.offsetHeight // Forzar reflow
        document.body.style.display = ""
      })
    }

    // Limpiar animaciones cuando el componente se desmonta
    return () => {
      cleanupAnimations()
      if (cleanupTriggers) cleanupTriggers()

      // Limpiar el event listener
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", () => {})
      }
    }
  }, [])

  return (
    <main>
      <BarraNavegacion />
      <SeccionPrincipal />
      <SeccionServicios />
      <CarruselLogos />
      <SeccionNosotros />
      <PorQueElegirnos />
      <SeccionUbicacion />
      <FormularioContacto />
    </main>
  )
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<HomePage />} />

        {/* Rutas de autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Ruta de servicios */}
        <Route path="/servicios" element={<ServiciosPage />} />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

