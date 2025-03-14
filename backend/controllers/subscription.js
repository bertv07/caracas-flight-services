const express = require('express');
const router = express.Router();
const { Subscription, User, Service } = require('../models');

// Crear una nueva suscripción
router.post('/', async (req, res) => {
  const { userId, serviceId, frequency, startDate, endDate } = req.body;
  try {
    const user = await User.findByPk(userId);
    const service = await Service.findByPk(serviceId);

    if (!user || !service) {
      return res.status(404).json({ error: 'Usuario o servicio no encontrado' });
    }

    const subscription = await Subscription.create({
      frequency,
      startDate,
      endDate,
      userId,
      serviceId,
    });

    res.status(201).json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la suscripción' });
  }
});

// Obtener todas las suscripciones de un usuario
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const subscriptions = await Subscription.findAll({
      where: { userId },
      include: [{ model: Service, as: 'Service' }],
    });

    res.json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las suscripciones' });
  }
});

// Actualizar una suscripción
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { frequency, startDate, endDate } = req.body;
  try {
    const subscription = await Subscription.findByPk(id);
    if (!subscription) {
      return res.status(404).json({ error: 'Suscripción no encontrada' });
    }

    subscription.frequency = frequency || subscription.frequency;
    subscription.startDate = startDate || subscription.startDate;
    subscription.endDate = endDate || subscription.endDate;

    await subscription.save();
    res.json(subscription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la suscripción' });
  }
});

// Eliminar una suscripción
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const subscription = await Subscription.findByPk(id);
    if (!subscription) {
      return res.status(404).json({ error: 'Suscripción no encontrada' });
    }

    await subscription.destroy();
    res.json({ message: 'Suscripción eliminada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la suscripción' });
  }
});

module.exports = router;