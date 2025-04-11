"use client"

import { useState } from "react"

import "../styles/auth.css"
import "../styles/services.css"

// Reemplaza esto con tu Client ID de PayPal
const PAYPAL_CLIENT_ID = "test"

export default function PaymentComponent({ service, onClose, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("paypal")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    // Datos para pagomovil
    nombre: "",
    telefono: "",
    cedula: "",
    referencia: "",
    // Datos para efectivo
    direccionEntrega: "",
    fechaEntrega: new Date().toISOString().split("T")[0],
    horaEntrega: "12:00",
    // Datos de suscripción
    frequency: "mensual", // Cambiado a "mensual" para coincidir con el modelo
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split("T")[0],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Extraer el precio numérico del string (por ejemplo, "USD $300 por aeronave" -> 300)
  const extractPrice = (priceString) => {
    const match = priceString.match(/\$\s*(\d+)/)
    return match ? Number.parseInt(match[1]) : 0
  }

  const price = service.price || extractPrice(service.precio)

  const handleSubmitManualPayment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validar campos según el método de pago
      if (paymentMethod === "pagomovil") {
        if (!formData.nombre || !formData.telefono || !formData.cedula || !formData.referencia) {
          throw new Error("Por favor complete todos los campos requeridos para Pago Móvil")
        }
      } else if (paymentMethod === "efectivo") {
        if (!formData.direccionEntrega || !formData.fechaEntrega || !formData.horaEntrega) {
          throw new Error("Por favor complete todos los campos requeridos para pago en Efectivo")
        }
      }

      // Simular procesamiento de pago
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Llamar a onSuccess con los datos de la suscripción y el método de pago
      onSuccess({
        ...formData,
        paymentMethod,
        status: "pending", // Los pagos manuales requieren aprobación del admin
      })
    } catch (err) {
      setError(err.message || "Error al procesar el pago. Por favor, inténtelo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="subscription-modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        className="subscription-modal-content auth-form"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "28px",
          backgroundColor: "var(--color-green)",
          padding: "2rem",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <button
          className="close-modal"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "24px",
            color: "white",
            cursor: "pointer",
          }}
        >
          &times;
        </button>

        <h2
          style={{ textAlign: "center", fontSize: "1.7rem", fontWeight: "600", color: "white", marginBottom: "1.5rem" }}
        >
          Método de Pago
        </h2>

        <div className="subscription-summary" style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: "1rem",
              borderRadius: "12px",
              marginBottom: "1.5rem",
            }}
          >
            <p style={{ color: "white", fontSize: "0.9rem" }}>Servicio seleccionado:</p>
            <p style={{ color: "white", fontWeight: "bold" }}>{service.titulo || service.name}</p>
            <p style={{ color: "white", fontSize: "0.9rem", marginTop: "0.5rem" }}>
              {service.descripcion || service.description}
            </p>
            <p style={{ color: "white", fontWeight: "bold", marginTop: "0.5rem" }}>
              {service.precio || `USD $${service.price}`}
            </p>
          </div>

          <div className="form-group" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="frequency" style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>
              Frecuencia de pago
            </label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "12px",
                border: "none",
                marginBottom: "1rem",
                backgroundColor: "#fff",
                color: "#000",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              <option value="mensual">Mensual</option>
              <option value="trimestral">Trimestral</option>
              <option value="semestral">Semestral</option>
            </select>
          </div>
        </div>

        {/* Selección de método de pago */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ color: "white", marginBottom: "1rem", fontWeight: "bold" }}>Seleccione método de pago:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
            <div
              onClick={() => setPaymentMethod("paypal")}
              style={{
                backgroundColor: paymentMethod === "paypal" ? "#023a02" : "white",
                color: paymentMethod === "paypal" ? "white" : "black",
                padding: "1rem",
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                <div style={{ fontSize: "24px" }}>💳</div>
              </div>
              <span>PayPal</span>
            </div>
            <div
              onClick={() => setPaymentMethod("pagomovil")}
              style={{
                backgroundColor: paymentMethod === "pagomovil" ? "#023a02" : "white",
                color: paymentMethod === "pagomovil" ? "white" : "black",
                padding: "1rem",
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                <div style={{ fontSize: "24px" }}>📱</div>
              </div>
              <span>Pago Móvil</span>
            </div>
            <div
              onClick={() => setPaymentMethod("efectivo")}
              style={{
                backgroundColor: paymentMethod === "efectivo" ? "#023a02" : "white",
                color: paymentMethod === "efectivo" ? "white" : "black",
                padding: "1rem",
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.5rem" }}>
                <div style={{ fontSize: "24px" }}>💵</div>
              </div>
              <span>Efectivo</span>
            </div>
          </div>
        </div>

        {/* Formulario según método de pago */}
        {paymentMethod === "paypal" && (
          <div>
\             <h3>Próximamente</h3>
          </div>
        )}

        {paymentMethod === "pagomovil" && (
          <form onSubmit={handleSubmitManualPayment}>
            <div
              style={{
                marginBottom: "1.5rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: "1rem",
                borderRadius: "12px",
              }}
            >
              <p style={{ color: "white", marginBottom: "1rem", fontWeight: "bold" }}>Instrucciones para Pago Móvil:</p>
              <p style={{ color: "white", fontSize: "0.9rem" }}>
                1. Realice el pago al número: <strong>0414-1234567</strong>
              </p>
              <p style={{ color: "white", fontSize: "0.9rem" }}>
                2. Banco: <strong>Banesco</strong>
              </p>
              <p style={{ color: "white", fontSize: "0.9rem" }}>
                3. CI: <strong>V-12345678</strong>
              </p>
              <p style={{ color: "white", fontSize: "0.9rem" }}>
                4. Monto: <strong>{service.precio || `USD $${service.price}`}</strong>
              </p>
              <p style={{ color: "white", fontSize: "0.9rem" }}>5. Complete el formulario con los datos de su pago</p>
              <p style={{ color: "white", fontSize: "0.9rem", fontStyle: "italic", marginTop: "0.5rem" }}>
                Nota: Su suscripción quedará pendiente hasta que un administrador verifique y apruebe su pago.
              </p>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="nombre" style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>
                Nombre completo
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleInputChange}
                placeholder="Nombre y apellido"
                style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "none", marginBottom: "1rem" }}
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="telefono" style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>
                Teléfono que realizó el pago
              </label>
              <input
                id="telefono"
                name="telefono"
                type="text"
                value={formData.telefono}
                onChange={handleInputChange}
                placeholder="Ej: 0414-1234567"
                style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "none", marginBottom: "1rem" }}
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="cedula" style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>
                Cédula
              </label>
              <input
                id="cedula"
                name="cedula"
                type="text"
                value={formData.cedula}
                onChange={handleInputChange}
                placeholder="Ej: V-12345678"
                style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "none", marginBottom: "1rem" }}
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="referencia" style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>
                Número de referencia
              </label>
              <input
                id="referencia"
                name="referencia"
                type="text"
                value={formData.referencia}
                onChange={handleInputChange}
                placeholder="Número de referencia del pago"
                style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "none", marginBottom: "1rem" }}
                required
              />
            </div>

            <button
              type="submit"
              className="auth-button au-btn "
              disabled={loading}
              style={{
                backgroundColor: "#023a02",
                border: "none",
                borderRadius: "16px",
                padding: "0.8rem 3rem",
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              {loading ? "Procesando..." : "Confirmar Pago"}
            </button>
          </form>
        )}

        {paymentMethod === "efectivo" && (
          <form onSubmit={handleSubmitManualPayment}>
            <div
              style={{
                marginBottom: "1.5rem",
                backgroundColor: "rgba(255,255,255,0.1)",
                padding: "1rem",
                borderRadius: "12px",
              }}
            >
              <p style={{ color: "white", marginBottom: "1rem", fontWeight: "bold" }}>
                Instrucciones para Pago en Efectivo:
              </p>
              <p style={{ color: "white", fontSize: "0.9rem" }}>
                1. Complete el formulario con los datos para la entrega
              </p>
              <p style={{ color: "white", fontSize: "0.9rem" }}>
                2. Un representante se comunicará con usted para coordinar la entrega
              </p>
              <p style={{ color: "white", fontSize: "0.9rem" }}>3. El pago se realizará al momento de la entrega</p>
              <p style={{ color: "white", fontSize: "0.9rem" }}>
                4. Monto a pagar: <strong>{service.precio || `USD $${service.price}`}</strong>
              </p>
              <p style={{ color: "white", fontSize: "0.9rem", fontStyle: "italic", marginTop: "0.5rem" }}>
                Nota: Su suscripción quedará pendiente hasta que un administrador confirme la recepción del pago.
              </p>
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="direccionEntrega" style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>
                Dirección de entrega
              </label>
              <textarea
                id="direccionEntrega"
                name="direccionEntrega"
                value={formData.direccionEntrega}
                onChange={handleInputChange}
                placeholder="Dirección completa para la entrega"
                style={{
                  width: "100%",
                  padding: "1rem",
                  borderRadius: "12px",
                  border: "none",
                  marginBottom: "1rem",
                  minHeight: "100px",
                }}
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="fechaEntrega" style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>
                Fecha preferida para la entrega
              </label>
              <input
                id="fechaEntrega"
                name="fechaEntrega"
                type="date"
                value={formData.fechaEntrega}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "none", marginBottom: "1rem" }}
                required
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="horaEntrega" style={{ color: "white", display: "block", marginBottom: "0.5rem" }}>
                Hora preferida para la entrega
              </label>
              <input
                id="horaEntrega"
                name="horaEntrega"
                type="time"
                value={formData.horaEntrega}
                onChange={handleInputChange}
                style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "none", marginBottom: "1rem" }}
                required
              />
            </div>

            <button
              type="submit"
              className="auth-button au-btn"
              disabled={loading}
              style={{
                backgroundColor: "#023a02",
                border: "none",
                borderRadius: "16px",
                padding: "0.8rem 3rem",
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              {loading ? "Procesando..." : "Confirmar Solicitud"}
            </button>
          </form>
        )}

        {error && (
          <div
            className="mensaje-error"
            style={{
              backgroundColor: "#fef2f2",
              color: "#b91c1c",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        {loading && (
          <div
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "1rem",
            }}
          >
            Procesando su solicitud...
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={onClose}
            className="auth-button au-btn"
            style={{
              backgroundColor: "transparent",
              border: "1px solid white",
              borderRadius: "16px",
              padding: "0.8rem 3rem",
              color: "white",
              fontSize: "1.2rem",
              fontWeight: "600",
              cursor: "pointer",
              width: "auto",
            }}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

