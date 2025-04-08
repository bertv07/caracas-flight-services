"use client";

import { useState, useEffect } from "react";
import { getUserId } from "../../utils/authUtils";
import "../../styles/auth.css";

export default function EditProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = getUserId(); // Obtiene el ID del usuario
        console.log("Obteniendo datos para el ID de usuario:", userId);

        const response = await fetch(
          `http://localhost:3000/api/users/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Usuario no encontrado");
          } else {
            throw new Error("Error al obtener datos del usuario");
          }
        }

        const userData = await response.json();
        setFormData({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          dateOfBirth: userData.dateOfBirth
            ? userData.dateOfBirth.split("T")[0]
            : "",
          email: userData.email || "",
          username: userData.username || "",
        });
      } catch (err) {
        setError(err.message || "Error al cargar datos del usuario");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      const userId = getUserId();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/edit-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId,
            ...formData,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al actualizar el perfil");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Error al actualizar el perfil");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="loading">Cargando datos del perfil...</div>;
  }

  return (
    <div className="profile-section">
      <h2>Editar Perfil</h2>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span className="alert-icon">✓</span>
          <span>Perfil actualizado exitosamente</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Fecha de Nacimiento</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="auth-button au-btn" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </form>
    </div>
  );
}
