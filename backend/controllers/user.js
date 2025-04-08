const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const router = express.Router();
const { User } = require('../models');
const emailService = require('../services/emailService');
// Importar el transporter para enviar correos
const transporter = require('../config/mail');
// Usar variable de entorno para SECRET_KEY
const SECRET_KEY = process.env.SECRET_KEY || 'tu_secreto_aqui'; // Es mejor usar variables de entorno

// Registro de usuarios
router.post('/register', async (req, res) => {
    const { firstName, lastName, dateOfBirth, email, username, password, role } = req.body;
    try {
        // Verificar si el email o el username ya existen
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email },
                    { username }
                ]
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: 'El email o el nombre de usuario ya están en uso' });
        }
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crear el usuario
        const user = await User.create({
            firstName,
            lastName,
            dateOfBirth,
            email,
            username,
            password: hashedPassword,
            role: role || 'pilot', // Si no se proporciona un rol, por defecto es 'pilot'
            status: 'pending' // Por defecto, el estado es 'pending'
        });
        // Enviar correo de bienvenida al usuario
        await emailService.sendWelcomeEmail(user);
        // Obtener correos de administradores
        const admins = await User.findAll({
            where: { role: 'admin' },
            attributes: ['email']
        });
        const adminEmails = admins.map(admin => admin.email);
        // Notificar a los administradores
        if (adminEmails.length > 0) {
            await emailService.notifyAdminsAboutNewUser(user, adminEmails);
        }
        res.status(201).json({ message: "Registro exitoso", userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// En tu ruta de login
router.post('/login', async (req, res) => {
    const { emailOrUsername, password } = req.body;
    try {
        // Buscar al usuario por email o username
        const user = await User.findOne({
            where: {
                [Op.or]: [
                    { email: emailOrUsername },
                    { username: emailOrUsername }
                ]
            }
        });
        
        // Verificar si el usuario existe y si la contraseña es correcta
        if (user && await bcrypt.compare(password, user.password)) {
            // Generar un token JWT que incluya el rol del usuario
            const token = jwt.sign(
                {
                    userId: user.id,
                    role: user.role  // Incluir el rol en el token
                },
                SECRET_KEY,
                { expiresIn: '1h' }
            );
            
            // Establecer el token en una cookie
            res.cookie('token', token, { httpOnly: true, path: '/' });
            
            // Devolver el token y la información del usuario
            res.json({
                token,
                userId: user.id,
                role: user.role,
                status: user.status
            });
        } else {
            res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});

// Olvido de contraseña
// Ruta para solicitar recuperación de contraseña
router.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'El correo electrónico es requerido' });
      }
      
      // Buscar al usuario por email
      const user = await User.findOne({ where: { email } });
      
      // Por seguridad, no revelamos si el email existe o no
      if (!user) {
        return res.status(200).json({
          message: 'Si el correo existe, se enviará un código de recuperación'
        });
      }
      
      // Generar un código numérico de 6 dígitos
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Guardar el código en la base de datos
      user.resetPasswordToken = resetCode;
      user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hora
      await user.save();
      
      // Configurar el correo
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'caracas.flight.services.email@gmail.com',
        to: user.email,
        subject: 'Código de recuperación de contraseña - Caracas Flight Services',
        html: `
          <h1>Recuperación de contraseña</h1>
          <p>Has solicitado restablecer tu contraseña.</p>
          <p>Tu código de recuperación es:</p>
          <h2 style="background-color: #f5f5f5; padding: 10px; font-size: 24px; letter-spacing: 5px; text-align: center;">${resetCode}</h2>
          <p>Este código expirará en 1 hora.</p>
          <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        `
      };
      
      // Enviar el correo
      await transporter.sendMail(mailOptions);
      
      res.status(200).json({
        message: 'Si el correo existe, se enviará un código de recuperación'
      });
    
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      res.status(500).json({
        error: 'Error al procesar la solicitud de recuperación de contraseña'
      });
    }
});

// Ruta para verificar el código y restablecer la contraseña
router.post('/reset-password', async (req, res) => {
    try {
      const { email, code, newPassword } = req.body;
      
      if (!email || !code || !newPassword) {
        return res.status(400).json({
          error: 'El email, código y la nueva contraseña son requeridos'
        });
      }
      
      // Buscar al usuario por email y verificar que el código sea válido
      const user = await User.findOne({
        where: {
          email: email,
          resetPasswordToken: code,
          resetPasswordExpires: { [Op.gt]: new Date() }
        }
      });
      
      if (!user) {
        return res.status(400).json({
          error: 'El código es inválido o ha expirado'
        });
      }
      
      // Hashear la nueva contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Actualizar la contraseña y limpiar los campos de token
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      
      res.status(200).json({
        message: 'Contraseña restablecida exitosamente'
      });
    
    } catch (error) {
      console.error('Error al restablecer contraseña:', error);
      res.status(500).json({
        error: 'Error al restablecer la contraseña'
      });
    }
}); 

// Cambio de contraseña
router.post('/change-password', async (req, res) => {
    const { userId, oldPassword, newPassword } = req.body;
    try {
        // Buscar al usuario por ID
        const user = await User.findByPk(userId);
        // Verificar si el usuario existe y si la contraseña antigua es correcta
        if (user && await bcrypt.compare(oldPassword, user.password)) {
            // Hashear la nueva contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            // Actualizar la contraseña
            user.password = hashedPassword;
            await user.save();
            res.json({ message: 'Contraseña cambiada exitosamente' });
        } else {
            res.status(401).json({ error: 'Contraseña antigua incorrecta' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al cambiar la contraseña' });
    }
});

// Editar perfil
router.post('/edit-profile', async (req, res) => {
    const { userId, firstName, lastName, dateOfBirth, email, username } = req.body;
    try {
        // Buscar al usuario por ID
        const user = await User.findByPk(userId);
        if (user) {
            // Actualizar los campos proporcionados
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.dateOfBirth = dateOfBirth || user.dateOfBirth;
            user.email = email || user.email;
            user.username = username || user.username;
            // Guardar los cambios
            await user.save();
            res.json({ message: 'Perfil actualizado exitosamente' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
});

// Cierre de sesión
router.post('/logout', (req, res) => {
    // Limpiar la cookie del token
    res.clearCookie('token', { path: '/' });
    res.json({ message: 'Cierre de sesión exitoso' });
});

// Obtener usuario por ID
router.get('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: 'El ID es requerido' });
      }
      
      const user = await User.findByPk(id); // Busca al usuario por ID
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
   
      res.json(user); // Devuelve los datos del usuario
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Obtener todos los usuarios para administración
router.get('/admin/users', async (req, res) => {
    try {
        const users = await User.findAll(); // Recuperar todos los usuarios
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al recuperar los usuarios' });
    }
});

// Aprobar usuario (solo admin)
router.put('/admin/users/:id/approve', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        user.status = 'approved';
        await user.save();
        
        // Enviar correo de aprobación
        await emailService.sendAccountApprovalEmail(user);
        
        res.json({ message: 'Usuario aprobado correctamente' });
    } catch (error) {
        console.error('Error al aprobar usuario:', error);
        res.status(500).json({ error: 'Error al aprobar el usuario' });
    }
});

// Rechazar usuario (solo admin)
router.put('/admin/users/:id/reject', async (req, res) => {
    try {
        const { id } = req.params;
        const { reason } = req.body;
        const user = await User.findByPk(id);
        
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        user.status = 'rejected';
        await user.save();
        
        // Enviar correo de rechazo
        await emailService.sendAccountRejectionEmail(user, reason);
        
        res.json({ message: 'Usuario rechazado correctamente' });
    } catch (error) {
        console.error('Error al rechazar usuario:', error);
        res.status(500).json({ error: 'Error al rechazar el usuario' });
    }
});

module.exports = router;
