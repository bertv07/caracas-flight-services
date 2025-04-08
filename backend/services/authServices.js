const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { User } = require("../models");
const emailService = require("./emailService");

const SECRET_KEY = "tu_secreto_aqui"; // Asegúrate de usar el mismo secreto que en middleware/auth.js

// Función para manejar el proceso de olvido de contraseña
const forgotPassword = async (email) => {
  try {
    // Buscar al usuario por email
    const user = await User.findOne({ where: { email } });
    
    // Si no encontramos un usuario, retornamos true de todas formas
    // (por seguridad, no revelamos si el email existe o no)
    if (!user) {
      return { success: true, message: 'Si el correo existe, se enviará un enlace de recuperación' };
    }
    
    // Generar un token único para la recuperación de contraseña
    const resetToken = jwt.sign(
      { userId: user.id },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
    
    // Guardar el token en la base de datos
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hora
    await user.save();
    
    // Enviar el correo con el token
    const emailSent = await emailService.sendPasswordResetEmail(user, resetToken);
    
    if (!emailSent) {
      throw new Error('Error al enviar el correo de recuperación');
    }
    
    return { 
      success: true, 
      message: 'Si el correo existe, se enviará un enlace de recuperación' 
    };
  } catch (error) {
    console.error('Error en forgotPassword:', error);
    return { 
      success: false, 
      error: 'Error al procesar la solicitud de recuperación de contraseña' 
    };
  }
};

// Función para restablecer la contraseña con un token
const resetPassword = async (token, newPassword) => {
  try {
    // Verificar el token
    const decoded = jwt.verify(token, SECRET_KEY);
    
    // Buscar al usuario por ID y verificar que el token sea válido
    const user = await User.findOne({
      where: {
        id: decoded.userId,
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: new Date() }
      }
    });
    
    if (!user) {
      return { 
        success: false, 
        error: 'El token es inválido o ha expirado' 
      };
    }
    
    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Actualizar la contraseña y limpiar los campos de token
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    
    return { 
      success: true, 
      message: 'Contraseña restablecida exitosamente' 
    };
  } catch (error) {
    console.error('Error en resetPassword:', error);
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return { 
        success: false, 
        error: 'El token es inválido o ha expirado' 
      };
    }
    return { 
      success: false, 
      error: 'Error al restablecer la contraseña' 
    };
  }
};

module.exports = {
  forgotPassword,
  resetPassword
};
