"use client"

import { useState } from "react"
import BarraNavegacion from "../components/barra-navegacion"
import NavBar from "../components/auth/navBarAuth"
import { isAuthenticated } from "../utils/authUtils"
import "../styles/ubicacion.css"

export default function UbicacionPage() {
  const [activeTab, setActiveTab] = useState("mapa")

  return (
    <div className="ubicacion-page" style={{ paddingTop: "3rem", marginTop: "5rem", paddingBottom: "4rem" }}>
      {isAuthenticated() ? <NavBar /> : <BarraNavegacion />}

      <div className="ubicacion-container">
        <div className="ubi-cont">
          <div className="ubicacion-tabs">
            <button className={`tab-button ${activeTab === "mapa" ? "active" : ""}`} onClick={() => setActiveTab("mapa")}>
              Mapa
            </button>
            <button
              className={`tab-button ${activeTab === "como-llegar" ? "active" : ""}`}
              onClick={() => setActiveTab("como-llegar")}
            >
              Cómo llegar
            </button>
          </div>
        </div>

        <div className="ubicacion-content">
          {activeTab === "mapa" && (
            <div className="tab-content mapa-tab">
              <div className="map-tabs">
                <h2>Aeropuerto internacional Caracas 'Oscar Machado Zuloaga'</h2>
                <p className="ubicacion-descripcion">
                  Estamos ubicados en el Aeropuerto Internacional Caracas 'Oscar Machado Zuloaga', el principal aeropuerto
                  para aviación general y ejecutiva en la región capital de Venezuela. Nuestra posición estratégica nos
                  permite ofrecer servicios aeronáuticos de primera clase con fácil acceso a Caracas y sus alrededores.
                </p>
              </div>

              <div className="mapa-grande">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2334.2161312263843!2d-66.8172901130242!3d10.288315250934646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2af005b313696b%3A0xed0851993de6ea1c!2sAeropuerto%20Internacional%20Caracas%20&#39;Oscar%20Machado%20Zuloaga&#39;&#39;!5e0!3m2!1ses!2sve!4v1735154274798!5m2!1ses!2sve"
                  width="100%"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="info-aeropuerto">
                <h3>Información del aeropuerto</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <h4>Código IATA</h4>
                    <p>CCS</p>
                  </div>
                  <div className="info-item">
                    <h4>Código OACI</h4>
                    <p>SVCS</p>
                  </div>
                  <div className="info-item">
                    <h4>Elevación</h4>
                    <p>2,145 ft / 654 m</p>
                  </div>
                  <div className="info-item">
                    <h4>Pista</h4>
                    <p>10/28 - 2,000 m x 45 m</p>
                  </div>
                  <div className="info-item">
                    <h4>Horario de operación</h4>
                    <p>24 horas</p>
                  </div>
                  <div className="info-item">
                    <h4>Servicios</h4>
                    <p>Aviación general, ejecutiva y privada</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "como-llegar" && (
            <div className="tab-content como-llegar-tab">
              <h2>Cómo llegar a nuestras instalaciones</h2>

              <div className="direcciones">
                <div className="direccion-item">
                  <h3>Desde Caracas</h3>
                  <ol>
                    <li>Tome la Autopista Valle-Coche en dirección sur.</li>
                    <li>Continúe por la Autopista Regional del Centro.</li>
                    <li>Tome la salida hacia Charallave/Ocumare del Tuy.</li>
                    <li>Siga las indicaciones hacia el Aeropuerto Internacional de Caracas.</li>
                    <li>Al llegar al aeropuerto, diríjase a la terminal de aviación general.</li>
                    <li>Nuestras oficinas se encuentran en el edificio principal de servicios FBO.</li>
                  </ol>
                  <p>Tiempo estimado: 30-45 minutos (dependiendo del tráfico)</p>
                </div>

                <div className="direccion-item">
                  <h3>Desde el Aeropuerto Internacional Simón Bolívar (Maiquetía)</h3>
                  <ol>
                    <li>Tome la Autopista Caracas-La Guaira hacia Caracas.</li>
                    <li>Continúe por la Autopista Francisco Fajardo hacia el sur.</li>
                    <li>Tome la Autopista Valle-Coche y siga las indicaciones anteriores.</li>
                  </ol>
                  <p>Tiempo estimado: 60-75 minutos (dependiendo del tráfico)</p>
                </div>
              </div>

              <div className="transporte">
                <h3>Opciones de transporte</h3>
                <div className="transporte-grid">
                  <div className="transporte-item">
                    <h4>Servicio de traslado</h4>
                    <p>
                      Ofrecemos servicio de traslado desde y hacia Caracas para nuestros clientes. Contáctenos para
                      reservar este servicio.
                    </p>
                  </div>
                  <div className="transporte-item">
                    <h4>Taxi</h4>
                    <p>
                      Hay servicios de taxi disponibles en el aeropuerto. Recomendamos utilizar servicios oficiales.
                    </p>
                  </div>
                  <div className="transporte-item">
                    <h4>Alquiler de vehículos</h4>
                    <p>Hay empresas de alquiler de vehículos disponibles en el aeropuerto.</p>
                  </div>
                  <div className="transporte-item">
                    <h4>Transporte ejecutivo</h4>
                    <p>Podemos coordinar servicios de transporte ejecutivo para nuestros clientes VIP.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

