const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const router = express.Router();
const { User } = require('../models');
const SECRET_KEY = 'tu_secreto_aqui'; // Asegúrate de mantener este secreto seguro

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

        res.status(201).json({ message: "Registro exitoso", userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Inicio de sesión de usuarios
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
            // Generar un token JWT
            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

            // Establecer el token en una cookie
            res.cookie('token', token, { httpOnly: true, path: '/' });
            console.log("inicio se sesion")
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
router.post('/forgot-password', (req, res) => {
    res.send('Funcionalidad no implementada');
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

module.exports = router;