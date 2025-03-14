// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  return !!localStorage.getItem("token")
}

// Función para obtener el token del usuario
export const getToken = () => {
  return localStorage.getItem("token")
}

// Función para obtener el rol del usuario
export const getUserRole = () => {
  return localStorage.getItem("role")
}

// Función para obtener el ID del usuario
export const getUserId = () => {
  return localStorage.getItem("userId")
}

// Función para obtener el estado del usuario
export const getUserStatus = () => {
  return localStorage.getItem("status")
}

// Función para agregar el token a las cabeceras de una petición
export const authHeader = () => {
  const token = getToken()

  if (token) {
    return { Authorization: `Bearer ${token}` }
  } else {
    return {}
  }
}

