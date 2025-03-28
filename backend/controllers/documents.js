const express = require("express");
const router = express.Router();
const { Documents, User } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configuración de Multer para almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten archivos de imagen"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Middleware para manejar múltiples archivos
const uploadFields = upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "verificationPhoto", maxCount: 1 },
  { name: "idPhoto", maxCount: 1 },
]);

// Crear documento (POST /api/documents)
router.post("/", uploadFields, async (req, res) => {
  try {
    console.log("Body recibido:", req.body); // Debug
    console.log("Archivos recibidos:", req.files); // Debug

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: "userId es requerido" });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Validar archivos subidos
    if (
      !req.files?.profilePhoto?.[0] ||
      !req.files?.verificationPhoto?.[0] ||
      !req.files?.idPhoto?.[0]
    ) {
      return res.status(400).json({ error: "Todos los documentos son requeridos" });
    }

    const document = await Documents.create({
      profilePhoto: `/uploads/${req.files.profilePhoto[0].filename}`,
      verificationPhoto: `/uploads/${req.files.verificationPhoto[0].filename}`,
      idPhoto: `/uploads/${req.files.idPhoto[0].filename}`,
      userId,
    });

    res.status(201).json(document);
  } catch (error) {
    console.error("Error en POST /documents:", error);
    res.status(500).json({ error: "Error al crear el documento" });
  }
});

// Obtener documentos por usuario (GET /api/documents/user/:userId)
router.get("/user/:userId", async (req, res) => {
  try {
    console.log("Buscando documentos para userId:", req.params.userId); // Debug
    const documents = await Documents.findOne({
      where: { userId: req.params.userId },
      include: [{ model: User, attributes: ["id", "username"] }], // Incluir datos del usuario
    });

    if (!documents) {
      return res.status(404).json({ error: "Documentos no encontrados" });
    }

    res.json(documents);
  } catch (error) {
    console.error("Error en GET /user/:userId:", error);
    res.status(500).json({ error: "Error al obtener documentos" });
  }
});

// Actualizar documento (PUT /api/documents/:id)
router.put("/:id", uploadFields, async (req, res) => {
  try {
    const document = await Documents.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    // Actualizar solo los archivos proporcionados
    if (req.files?.profilePhoto?.[0]) {
      document.profilePhoto = `/uploads/${req.files.profilePhoto[0].filename}`;
    }
    if (req.files?.verificationPhoto?.[0]) {
      document.verificationPhoto = `/uploads/${req.files.verificationPhoto[0].filename}`;
    }
    if (req.files?.idPhoto?.[0]) {
      document.idPhoto = `/uploads/${req.files.idPhoto[0].filename}`;
    }

    await document.save();
    res.json(document);
  } catch (error) {
    console.error("Error en PUT /:id:", error);
    res.status(500).json({ error: "Error al actualizar documento" });
  }
});

// Eliminar documento (DELETE /api/documents/:id)
router.delete("/:id", async (req, res) => {
  try {
    const document = await Documents.findByPk(req.params.id);
    if (!document) {
      return res.status(404).json({ error: "Documento no encontrado" });
    }

    // Eliminar archivos físicos
    [document.profilePhoto, document.verificationPhoto, document.idPhoto].forEach((filePath) => {
      if (filePath) {
        const fullPath = path.join(__dirname, "..", filePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
      }
    });

    await document.destroy();
    res.json({ message: "Documento eliminado exitosamente" });
  } catch (error) {
    console.error("Error en DELETE /:id:", error);
    res.status(500).json({ error: "Error al eliminar documento" });
  }
});

module.exports = router;