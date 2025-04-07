const express = require("express")
const router = express.Router()
const { Subscription, User, Service } = require("../models")
const { verifyToken, isAdmin } = require("../middleware/auth")
const emailService = require("../services/emailService")

// Aplicar middleware a todas las rutas
router.use(verifyToken, isAdmin)

// Agregar esta ruta para obtener todos los usuarios
router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al recuperar los usuarios" });
  }
});

// Obtener todas las suscripciones pendientes
router.get("/pending-subscriptions", async (req, res) => {
  try {
    const pendingSubscriptions = await Subscription.findAll({
      where: { status: "pending" },
      include: [
        { model: User, as: "User" },
        { model: Service, as: "Service" },
      ],
      order: [["createdAt", "DESC"]],
    })
    res.json(pendingSubscriptions)
  } catch (error) {
    console.error("Error al obtener suscripciones pendientes:", error)
    res.status(500).json({ error: "Error al obtener las suscripciones pendientes" })
  }
})

// Aprobar una suscripción
router.post("/approve-subscription/:id", async (req, res) => {
  const { id } = req.params
  try {
    const subscription = await Subscription.findByPk(id, {
      include: [
        { model: User, as: "User" },
        { model: Service, as: "Service" }
      ]
    })
    
    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" })
    }
    
    subscription.status = "approved"
    await subscription.save()
    
    // Enviar correo de aprobación al usuario
    try {
      await emailService.sendSubscriptionApprovalEmail(
        subscription.User, 
        subscription, 
        subscription.Service
      )
      console.log(`Correo de aprobación enviado a ${subscription.User.email}`)
    } catch (emailError) {
      console.error("Error al enviar correo de aprobación:", emailError)
      // No fallamos la operación principal si falla el envío de correo
    }
    
    res.json({ 
      message: "Suscripción aprobada exitosamente", 
      subscription,
      emailSent: true
    })
  } catch (error) {
    console.error("Error al aprobar suscripción:", error)
    res.status(500).json({ error: "Error al aprobar la suscripción" })
  }
})

// Rechazar una suscripción
router.post("/reject-subscription/:id", async (req, res) => {
  const { id } = req.params
  const { reason } = req.body // Opcional: razón del rechazo
  
  try {
    const subscription = await Subscription.findByPk(id, {
      include: [
        { model: User, as: "User" },
        { model: Service, as: "Service" }
      ]
    })
    
    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" })
    }
    
    subscription.status = "rejected"
    await subscription.save()
    
    // Enviar correo de rechazo al usuario
    try {
      await emailService.sendSubscriptionRejectionEmail(
        subscription.User, 
        subscription, 
        subscription.Service,
        reason
      )
      console.log(`Correo de rechazo enviado a ${subscription.User.email}`)
    } catch (emailError) {
      console.error("Error al enviar correo de rechazo:", emailError)
      // No fallamos la operación principal si falla el envío de correo
    }
    
    res.json({ 
      message: "Suscripción rechazada exitosamente", 
      subscription,
      emailSent: true
    })
  } catch (error) {
    console.error("Error al rechazar suscripción:", error)
    res.status(500).json({ error: "Error al rechazar la suscripción" })
  }
})

// Obtener todas las suscripciones (para administradores)
router.get("/subscriptions", async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      include: [
        { model: User, as: "User" },
        { model: Service, as: "Service" },
      ],
      order: [["createdAt", "DESC"]],
    })
    res.json(subscriptions)
  } catch (error) {
    console.error("Error al obtener todas las suscripciones:", error)
    res.status(500).json({ error: "Error al obtener las suscripciones" })
  }
})

// Obtener detalles de una suscripción específica
router.get("/subscription/:id", async (req, res) => {
  const { id } = req.params
  try {
    const subscription = await Subscription.findByPk(id, {
      include: [
        { model: User, as: "User" },
        { model: Service, as: "Service" },
      ]
    })
    
    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" })
    }
    
    res.json(subscription)
  } catch (error) {
    console.error("Error al obtener detalles de la suscripción:", error)
    res.status(500).json({ error: "Error al obtener los detalles de la suscripción" })
  }
})

// Obtener estadísticas de suscripciones
router.get("/subscription-stats", async (req, res) => {
  try {
    const totalCount = await Subscription.count()
    const pendingCount = await Subscription.count({ where: { status: "pending" } })
    const approvedCount = await Subscription.count({ where: { status: "approved" } })
    const rejectedCount = await Subscription.count({ where: { status: "rejected" } })
    const cancelledCount = await Subscription.count({ where: { status: "cancel" } })
    
    res.json({
      total: totalCount,
      pending: pendingCount,
      approved: approvedCount,
      rejected: rejectedCount,
      cancelled: cancelledCount
    })
  } catch (error) {
    console.error("Error al obtener estadísticas de suscripciones:", error)
    res.status(500).json({ error: "Error al obtener estadísticas" })
  }
})

// Obtener usuarios pendientes de aprobación
router.get("/pending-users", async (req, res) => {
  try {
    const pendingUsers = await User.findAll({
      where: { status: "pending" },
      order: [["createdAt", "DESC"]],
    })
    res.json(pendingUsers)
  } catch (error) {
    console.error("Error al obtener usuarios pendientes:", error)
    res.status(500).json({ error: "Error al obtener los usuarios pendientes" })
  }
})

// Aprobar un usuario
router.post("/approve-user/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await User.findByPk(id)
    
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }
    
    user.status = "active"
    await user.save()
    
    // Enviar correo de aprobación al usuario
    try {
      await emailService.sendAccountApprovalEmail(user)
      console.log(`Correo de aprobación de cuenta enviado a ${user.email}`)
    } catch (emailError) {
      console.error("Error al enviar correo de aprobación de cuenta:", emailError)
    }
    
    res.json({ 
      message: "Usuario aprobado exitosamente", 
      user,
      emailSent: true
    })
  } catch (error) {
    console.error("Error al aprobar usuario:", error)
    res.status(500).json({ error: "Error al aprobar el usuario" })
  }
})

// Rechazar un usuario
router.post("/reject-user/:id", async (req, res) => {
  const { id } = req.params
  const { reason } = req.body
  
  try {
    const user = await User.findByPk(id)
    
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" })
    }
    
    user.status = "rejected"
    await user.save()
    
    // Enviar correo de rechazo al usuario
    try {
      await emailService.sendAccountRejectionEmail(user, reason)
      console.log(`Correo de rechazo de cuenta enviado a ${user.email}`)
    } catch (emailError) {
      console.error("Error al enviar correo de rechazo de cuenta:", emailError)
    }
    
    res.json({ 
      message: "Usuario rechazado exitosamente", 
      user,
      emailSent: true
    })
  } catch (error) {
    console.error("Error al rechazar usuario:", error)
    res.status(500).json({ error: "Error al rechazar el usuario" })
  }
})

module.exports = router
