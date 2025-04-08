import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:3000/api';

// Función para solicitar código de recuperación
const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/users/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error('Error en forgotPassword:', error);
    if (error.response) {
      throw new Error(error.response.data.error || 'Error al procesar la solicitud');
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor');
    } else {
      throw new Error('Error al enviar la solicitud');
    }
  }
};

// Función para verificar código y restablecer contraseña
const resetPassword = async (email, code, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/users/reset-password`, { 
      email,
      code, 
      newPassword 
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Error al restablecer la contraseña');
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor');
    } else {
      throw new Error('Error al enviar la solicitud');
    }
  }
};

// Exportar las funciones
export const authService = {
  forgotPassword,
  resetPassword,
  // Incluye aquí otras funciones de autenticación que ya tengas
};
