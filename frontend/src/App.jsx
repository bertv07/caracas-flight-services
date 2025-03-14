"use client"

import { useEffect } from "react"
import BarraNavegacion from "./components/barra-navegacion"
import SeccionPrincipal from "./components/seccion-principal"
import SeccionServicios from "./components/seccion-servicios"
import CarruselLogos from "./components/carrusel-logos"
import SeccionNosotros from "./components/seccion-nosotros"
import PorQueElegirnos from "./components/por-que-elegirnos"
import SeccionUbicacion from "./components/seccion-ubicacion"
import FormularioContacto from "./components/formulario-contacto"
import { initAnimations, cleanupAnimations, createResponsiveTriggers } from "./utils/animations"

export default function Home() {
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

