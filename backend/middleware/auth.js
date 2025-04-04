const jwt = require("jsonwebtoken")
const { User } = require("../models")
const SECRET_KEY = "tu_secreto_aqui" // Asegúrate de usar el mismo secreto que en el controlador de usuarios

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No se proporcionó un token de autenticación" })
  }

  const token = authHeader.split(" ")[1]

  try {
    // Verificar el token
    const decoded = jwt.verify(token, SECRET_KEY)

    // Añadir el ID del usuario al objeto de solicitud
    req.userId = decoded.userId
    req.userRole = decoded.role

    next()
  } catch (error) {
    console.error("Error al verificar token:", error)
    return res.status(401).json({ error: "Token inválido o expirado" })
  }
}

// Middleware para verificar si el usuario es administrador
const isAdmin = async (req, res, next) => {
  try {
    if (req.userRole !== "admin") {
      return res.status(403).json({ error: "Acceso denegado. Se requieren permisos de administrador" })
    }

    next()
  } catch (error) {
    console.error("Error al verificar rol de administrador:", error)
    return res.status(500).json({ error: "Error al verificar permisos de administrador" })
  }
}

module.exports = { verifyToken, isAdmin }

