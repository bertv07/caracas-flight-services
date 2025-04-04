const express = require("express")
const router = express.Router()
const { Subscription, User, Service } = require("../models")

// Middleware para verificar token - Comentado temporalmente para pruebas
// const { verifyToken } = require("../middleware/auth")
// router.use(verifyToken)

// Ruta de prueba para verificar que el controlador está funcionando
router.get("/test", (req, res) => {
  res.json({ message: "Controlador de suscripciones funcionando correctamente" })
})

// Crear una nueva suscripción
router.post("/", async (req, res) => {
  console.log("POST /api/subscriptions - Recibida solicitud")
  const { userId, serviceId, frequency, startDate, endDate, paymentMethod, paymentDetails, status } = req.body

  console.log("Datos recibidos:", req.body)

  try {
    // Verificar que el usuario existe
    const user = await User.findByPk(userId)
    if (!user) {
      console.log(`Usuario con ID ${userId} no encontrado`)
      return res.status(404).json({ error: "Usuario no encontrado" })
    }

    // Verificar que el servicio existe
    const service = await Service.findByPk(serviceId)
    if (!service) {
      console.log(`Servicio con ID ${serviceId} no encontrado`)
      return res.status(404).json({ error: "Servicio no encontrado" })
    }

    console.log("Usuario y servicio encontrados, creando suscripción")

    // Crear la suscripción con los campos básicos primero
    const subscriptionData = {
      userId,
      serviceId,
      frequency,
      startDate,
      endDate,
    }

    // Añadir campos adicionales si existen en la tabla
    try {
      // Verificar si la tabla tiene las columnas necesarias
      const subscription = await Subscription.create(subscriptionData)

      // Intentar actualizar con los campos adicionales
      try {
        if (paymentMethod) subscription.paymentMethod = paymentMethod
        if (paymentDetails) subscription.paymentDetails = paymentDetails
        if (status) subscription.status = status

        await subscription.save()
      } catch (updateError) {
        console.log("No se pudieron actualizar campos adicionales:", updateError.message)
        // No fallamos aquí, ya que la suscripción básica se creó correctamente
      }

      console.log("Suscripción creada:", subscription.id)
      res.status(201).json(subscription)
    } catch (createError) {
      console.error("Error al crear suscripción:", createError)
      res.status(500).json({ error: "Error al crear la suscripción", details: createError.message })
    }
  } catch (error) {
    console.error("Error general:", error)
    res.status(500).json({ error: "Error al procesar la solicitud", details: error.message })
  }
})

// Actualizar una suscripción
router.put("/:id", async (req, res) => {
  const { id } = req.params
  const { frequency, startDate, endDate, status } = req.body
  try {
    const subscription = await Subscription.findByPk(id)
    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" })
    }

    subscription.frequency = frequency || subscription.frequency
    subscription.startDate = startDate || subscription.startDate
    subscription.endDate = endDate || subscription.endDate

    // Intentar actualizar el estado si existe la columna
    try {
      if (status) subscription.status = status
    } catch (error) {
      console.log("No se pudo actualizar el estado:", error.message)
    }

    await subscription.save()
    res.json(subscription)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al actualizar la suscripción" })
  }
})

// Eliminar una suscripción
router.delete("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const subscription = await Subscription.findByPk(id)
    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" })
    }

    await subscription.destroy()
    res.json({ message: "Suscripción eliminada exitosamente" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error al eliminar la suscripción" })
  }
})

// Cancelar una suscripción
router.put("/:id/cancel", async (req, res) => {
  const { id } = req.params
  try {
    const subscription = await Subscription.findByPk(id)
    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" })
    }

    // Cambiar el estado a "cancel" en lugar de "rejected"
    subscription.status = "cancel"
    await subscription.save()

    res.json({
      message: "Suscripción cancelada exitosamente",
      subscription,
    })
  } catch (error) {
    console.error("Error al cancelar la suscripción:", error)
    res.status(500).json({ error: "Error al cancelar la suscripción" })
  }
})

// Aprobar una suscripción (para administradores)
router.put("/:id/approve", async (req, res) => {
  const { id } = req.params
  try {
    const subscription = await Subscription.findByPk(id)
    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" })
    }

    // Cambiar el estado a "approved"
    subscription.status = "approved"
    await subscription.save()

    res.json({
      message: "Suscripción aprobada exitosamente",
      subscription,
    })
  } catch (error) {
    console.error("Error al aprobar la suscripción:", error)
    res.status(500).json({ error: "Error al aprobar la suscripción" })
  }
})

// Obtener todas las suscripciones de un usuario
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params
  console.log(`GET /api/subscriptions/user/${userId} - Recibida solicitud`)
  try {
    // Usar raw: true para obtener objetos JavaScript planos
    const subscriptions = await Subscription.findAll({
      where: { userId },
      include: [
        {
          model: Service,
          as: "Service",
        },
      ],
      raw: true,
      nest: true, // Esto anidará los resultados de las asociaciones
    })

    console.log(`Encontradas ${subscriptions.length} suscripciones`)
    console.log("Ejemplo de suscripción completa:", JSON.stringify(subscriptions[0], null, 2))

    res.json(subscriptions)
  } catch (error) {
    console.error("Error al obtener suscripciones:", error)
    res.status(500).json({ error: "Error al obtener las suscripciones", details: error.message })
  }
})

module.exports = router

