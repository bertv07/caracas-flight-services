import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css'; // Ajusta la ruta según tu estructura
import { authService } from '../services/authServices'; // Ajusta la ruta según tu estructura

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: Solicitar código, 2: Verificar código y cambiar contraseña
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Solicitar código de recuperación
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await authService.forgotPassword(email);
      setStep(2); // Avanzar al siguiente paso
    } catch (err) {
      console.error("Error al solicitar código:", err);
      setError(err.message || "Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  // Verificar código y cambiar contraseña
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
    // Validar longitud mínima de contraseña
    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    setLoading(true);
    
    try {
      await authService.resetPassword(email, code, newPassword);
      setSuccess(true);
    } catch (err) {
      console.error("Error al restablecer contraseña:", err);
      setError(err.message || "Error al procesar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="auth-container">
        <h1 className="auth-title">Recuperar Contraseña</h1>
        
        {error && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}
        
        {success ? (
          <div style={{ maxWidth: "500px", textAlign: "center" }}>
            <div className="alert alert-success">
              <span className="alert-icon">✓</span>
              <span>Tu contraseña ha sido restablecida exitosamente.</span>
            </div>
            <Link to="/login" className="auth-link" style={{ color: "var(--color-green)" }}>
              Volver al inicio de sesión
            </Link>
          </div>
        ) : step === 1 ? (
          // Paso 1: Solicitar código
          <form onSubmit={handleRequestCode} className="auth-form">
            <legend>Ingresa tu correo electrónico</legend>
            <p className="auth-description">
              Te enviaremos un código de verificación para restablecer tu contraseña.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
            <div className="auth-form-row">
              <Link to="/login" className="auth-link">
                Volver al inicio de sesión
              </Link>
              <button type="submit" className="auth-button au-btn" disabled={loading}>
                {loading ? "Enviando..." : "Enviar código"}
              </button>
            </div>
          </form>
        ) : (
          // Paso 2: Verificar código y cambiar contraseña
          <form onSubmit={handleResetPassword} className="auth-form">
            <legend>Ingresa el código y tu nueva contraseña</legend>
            <p className="auth-description">
              Hemos enviado un código de verificación a <strong>{email}</strong>.
            </p>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Código de verificación"
              required
              maxLength={6}
              pattern="\d{6}"
              title="El código debe tener 6 dígitos"
              className="auth-code-input"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Nueva contraseña"
              required
              minLength={6}
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmar nueva contraseña"
              required
              minLength={6}
            />
            <div className="auth-form-row">
              <button 
                type="button" 
                className="auth-link-button"
                onClick={() => setStep(1)}
              >
                Volver
              </button>
              <button type="submit" className="auth-button au-btn" disabled={loading}>
                {loading ? "Procesando..." : "Cambiar contraseña"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
