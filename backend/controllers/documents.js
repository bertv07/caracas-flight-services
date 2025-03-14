const express = require('express');
const router = express.Router();
const { Documents, User } = require('../models');

// Crear un nuevo documento
router.post('/', async (req, res) => {
  const { userId, profilePhoto, verificationPhoto, idPhoto } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const document = await Documents.create({
      profilePhoto,
      verificationPhoto,
      idPhoto,
      userId,
    });

    res.status(201).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el documento' });
  }
});

// Obtener documentos de un usuario
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const documents = await Documents.findOne({ where: { userId } });
    if (!documents) {
      return res.status(404).json({ error: 'Documentos no encontrados' });
    }

    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los documentos' });
  }
});

// Actualizar un documento
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { profilePhoto, verificationPhoto, idPhoto } = req.body;
  try {
    const document = await Documents.findByPk(id);
    if (!document) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    document.profilePhoto = profilePhoto || document.profilePhoto;
    document.verificationPhoto = verificationPhoto || document.verificationPhoto;
    document.idPhoto = idPhoto || document.idPhoto;

    await document.save();
    res.json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el documento' });
  }
});

// Eliminar un documento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Documents.findByPk(id);
    if (!document) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    await document.destroy();
    res.json({ message: 'Documento eliminado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el documento' });
  }
});

module.exports = router;