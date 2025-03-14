const express = require('express');
const router = express.Router();
const { Service, Subscription } = require('../models');

// Crear un nuevo servicio
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const service = await Service.create({
      name,
      description,
      price,
    });

    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el servicio' });
  }
});

// Obtener todos los servicios
router.get('/', async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los servicios' });
  }
});

// Obtener un servicio por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id, {
      include: [{ model: Subscription, as: 'Subscriptions' }],
    });

    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el servicio' });
  }
});

// Actualizar un servicio
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    service.name = name || service.name;
    service.description = description || service.description;
    service.price = price || service.price;

    await service.save();
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el servicio' });
  }
});

// Eliminar un servicio
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    await service.destroy();
    res.json({ message: 'Servicio eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el servicio' });
  }
});

module.exports = router;