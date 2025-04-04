const express = require("express")
const router = express.Router()
const { Subscription, User, Service } = require("../models")
const { verifyToken, isAdmin } = require("../middleware/auth")

// Aplicar middleware a todas las rutas
router.use(verifyToken, isAdmin)

// Agregar esta ruta para obtener todos los usuarios
router.get("/users", verifyToken, isAdmin, async (req, res) => {
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
    const subscription = await Subscription.findByPk(id)

    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" })
    }

    subscription.status = "approved"
    await subscription.save()

    res.json({ message: "Suscripción aprobada exitosamente", subscription })
  } catch (error) {
    console.error("Error al aprobar suscripción:", error)
    res.status(500).json({ error: "Error al aprobar la suscripción" })
  }
})

// Rechazar una suscripción
router.post("/reject-subscription/:id", async (req, res) => {
  const { id } = req.params

  try {
    const subscription = await Subscription.findByPk(id)

    if (!subscription) {
      return res.status(404).json({ error: "Suscripción no encontrada" })
    }

    subscription.status = "rejected"
    await subscription.save()

    res.json({ message: "Suscripción rechazada exitosamente", subscription })
  } catch (error) {
    console.error("Error al rechazar suscripción:", error)
    res.status(500).json({ error: "Error al rechazar la suscripción" })
  }
})

module.exports = router

