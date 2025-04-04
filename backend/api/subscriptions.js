// Este archivo debe colocarse en la carpeta correcta de tu backend
// Por ejemplo: /api/subscriptions.js o /routes/subscriptions.js

const express = require("express")
const router = express.Router()
const { Subscription, User, Service } = require("../models")

// Crear una nueva suscripción
router.post("/", async (req, res) => {
  const { userId, serviceId, frequency, startDate, endDate, paymentMethod, paymentDetails, status } = req.body

  try {
    // Verificar que el usuario y el servicio existan
    const user = await User.findByPk(userId)
    const service = await Service.findByPk(serviceId)

    if (!user || !service) {
      return res.status(404).json({ error: "Usuario o servicio no encontrado" })
    }

    // Crear la suscripción con todos los campos
    const subscription = await Subscription.create({
      userId,
      serviceId,
      frequency,
      startDate,
      endDate,
      paymentMethod,
      paymentDetails,
      status: status || "pending",
    })

    res.status(201).json(subscription)
  } catch (error) {
    console.error("Error al crear suscripción:", error)
    res.status(500).json({ error: "Error al crear la suscripción" })
  }
})

// Obtener todas las suscripciones
router.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      include: [
        { model: User, as: "User" },
        { model: Service, as: "Service" },
      ],
    })
    res.json(subscriptions)
  } catch (error) {
    console.error("Error al obtener suscripciones:", error)
    res.status(500).json({ error: "Error al obtener las suscripciones" })
  }
})

// Obtener suscripciones de un usuario específico
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params

  try {
    const subscriptions = await Subscription.findAll({
      where: { userId },
      include: [{ model: Service, as: "Service" }],
    })

    res.json(subscriptions)
  } catch (error) {
    console.error("Error al obtener suscripciones del usuario:", error)
    res.status(500).json({ error: "Error al obtener las suscripciones del usuario" })
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

    // Actualizar los campos
    if (frequency) subscription.frequency = frequency
    if (startDate) subscription.startDate = startDate
    if (endDate) subscription.endDate = endDate
    if (status) subscription.status = status

    await subscription.save()

    res.json(subscription)
  } catch (error) {
    console.error("Error al actualizar suscripción:", error)
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
    console.error("Error al eliminar suscripción:", error)
    res.status(500).json({ error: "Error al eliminar la suscripción" })
  }
})

module.exports = router

