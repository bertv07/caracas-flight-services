const API_URL = import.meta.env.VITE_API_URL + '/api';

// Define the missing functions
const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/users/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al procesar la solicitud');
  }
  return await response.json();
};

const resetPassword = async (email, code, newPassword) => {
  const response = await fetch(`${API_URL}/users/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, code, newPassword }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al restablecer la contraseña');
  }
  return await response.json();
};

export const authService = {
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al registrar usuario');
    }
    return await response.json();
  },
  
  login: async (emailOrUsername, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUsername, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al iniciar sesión');
    }
    return await response.json();
  },
  
  forgotPassword,
  resetPassword,
};
