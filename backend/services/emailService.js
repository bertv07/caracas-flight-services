const nodemailer = require('nodemailer');
const transporter = require('../config/mail');
require('dotenv').config();
const host = process.env.HOST;
// Correo de bienvenida al usuario cuando se registra
const sendWelcomeEmail = async (user) => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: 'Bienvenido a Caracas Flight Services - Registro Pendiente de Aprobación',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">¡Bienvenido a Caracas Flight Services!</h1>
          <p>Hola ${user.firstName},</p>
          <p>Gracias por registrarte en nuestra plataforma. Tu cuenta ha sido creada exitosamente y está pendiente de aprobación por nuestro equipo administrativo.</p>
          <p>Te notificaremos por correo electrónico cuando tu cuenta haya sido aprobada, lo que generalmente ocurre dentro de las próximas 24-48 horas.</p>
          <p>Detalles de tu cuenta:</p>
          <ul>
            <li><strong>Nombre:</strong> ${user.firstName} ${user.lastName || ''}</li>
            <li><strong>Email:</strong> ${user.email}</li>
          </ul>
          <p>Si tienes alguna pregunta mientras esperas la aprobación, no dudes en contactarnos respondiendo a este correo.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de bienvenida enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de bienvenida:', error);
    return false;
  }
};

// Notificación a administradores sobre nuevo usuario
const notifyAdminsAboutNewUser = async (user, adminEmails) => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: adminEmails,
      subject: 'Nuevo usuario registrado - Requiere aprobación',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">Nuevo Usuario Registrado</h1>
          <p>Un nuevo usuario se ha registrado en la plataforma y requiere aprobación:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${user.firstName} ${user.lastName || ''}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Teléfono:</strong> ${user.phone || 'No proporcionado'}</p>
            <p><strong>Fecha de registro:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p>Por favor, inicie sesión en el panel de administración para revisar y aprobar/rechazar este usuario.</p>
          <div style="text-align: center; margin-top: 25px;">
            <a href="${process.env.ADMIN_URL || `${process.env.HOST}/admin`}" style="background-color: #003366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ir al Panel de Administración</a>
          </div>
        </div>
      `
    });
    console.log(`Notificación enviada a ${adminEmails.length} administradores`);
    return true;
  } catch (error) {
    console.error('Error al enviar notificación a administradores:', error);
    return false;
  }
};

// Correo de aprobación de cuenta
const sendAccountApprovalEmail = async (user) => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: '¡Tu cuenta ha sido aprobada! - Caracas Flight Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">¡Cuenta Aprobada!</h1>
          <p>Hola ${user.firstName},</p>
          <p>Nos complace informarte que tu cuenta en Caracas Flight Services ha sido <strong style="color: #28a745;">aprobada</strong>.</p>
          <p>Ya puedes iniciar sesión y disfrutar de todos nuestros servicios.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.WEBSITE_URL || `${process.env.HOST}/login`}" style="background-color: #003366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Iniciar Sesión</a>
          </div>
          <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de aprobación de cuenta enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de aprobación de cuenta:', error);
    return false;
  }
};

// Correo de rechazo de cuenta
const sendAccountRejectionEmail = async (user, reason = '') => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: 'Información sobre tu solicitud de cuenta - Caracas Flight Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">Actualización de tu Solicitud de Cuenta</h1>
          <p>Hola ${user.firstName},</p>
          <p>Lamentamos informarte que tu solicitud de cuenta en Caracas Flight Services no ha sido aprobada en este momento.</p>
          ${reason ? `<p><strong>Motivo:</strong> ${reason}</p>` : ''}
          <p>Si crees que ha habido un error o deseas más información, por favor contáctanos respondiendo a este correo.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de rechazo de cuenta enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de rechazo de cuenta:', error);
    return false;
  }
};

// Correo al usuario cuando crea una nueva suscripción
const sendSubscriptionPendingEmail = async (user, subscription, service) => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: 'Tu solicitud de suscripción está en revisión - Caracas Flight Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">Solicitud de Suscripción Recibida</h1>
          <p>Hola ${user.firstName},</p>
          <p>Hemos recibido tu solicitud de suscripción al servicio <strong>${service.name}</strong>. Tu solicitud está siendo revisada por nuestro equipo administrativo.</p>
          <p>Detalles de la suscripción:</p>
          <ul>
            <li><strong>Servicio:</strong> ${service.name}</li>
            <li><strong>Frecuencia:</strong> ${subscription.frequency}</li>
            <li><strong>Fecha de inicio:</strong> ${new Date(subscription.startDate).toLocaleDateString()}</li>
            ${subscription.endDate ? `<li><strong>Fecha de fin:</strong> ${new Date(subscription.endDate).toLocaleDateString()}</li>` : ''}
          </ul>
          <p>Te notificaremos por correo electrónico cuando tu suscripción haya sido aprobada.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de suscripción pendiente enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de suscripción pendiente:', error);
    return false;
  }
};

// Notificación a administradores sobre nueva suscripción
const notifyAdminsAboutNewSubscription = async (user, subscription, service, adminEmails) => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: adminEmails,
      subject: 'Nueva solicitud de suscripción - Requiere aprobación',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">Nueva Solicitud de Suscripción</h1>
          <p>Un usuario ha solicitado una nueva suscripción que requiere aprobación:</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Usuario:</strong> ${user.firstName} ${user.lastName || ''} (${user.email})</p>
            <p><strong>Servicio:</strong> ${service.name}</p>
            <p><strong>Frecuencia:</strong> ${subscription.frequency}</p>
            <p><strong>Fecha de inicio:</strong> ${new Date(subscription.startDate).toLocaleDateString()}</p>
            ${subscription.endDate ? `<p><strong>Fecha de fin:</strong> ${new Date(subscription.endDate).toLocaleDateString()}</p>` : ''}
            <p><strong>Método de pago:</strong> ${subscription.paymentMethod || 'No especificado'}</p>
            <p><strong>Fecha de solicitud:</strong> ${new Date().toLocaleString()}</p>
          </div>
          <p>Por favor, inicie sesión en el panel de administración para revisar y aprobar/rechazar esta solicitud.</p>
          <div style="text-align: center; margin-top: 25px;">
            <a href="${process.env.ADMIN_URL || `${process.env.HOST}/admin`}" style="background-color: #003366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ir al Panel de Administración</a>
          </div>
        </div>
      `
    });
    console.log(`Notificación de nueva suscripción enviada a ${adminEmails.length} administradores`);
    return true;
  } catch (error) {
    console.error('Error al enviar notificación de suscripción a administradores:', error);
    return false;
  }
};

// Correo de aprobación de suscripción
const sendSubscriptionApprovalEmail = async (user, subscription, service) => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: '¡Tu suscripción ha sido aprobada! - Caracas Flight Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">¡Suscripción Aprobada!</h1>
          <p>Hola ${user.firstName},</p>
          <p>Nos complace informarte que tu suscripción al servicio <strong>${service.name}</strong> ha sido <strong style="color: #28a745;">aprobada</strong>.</p>
          <p>Detalles de la suscripción:</p>
          <ul>
            <li><strong>Servicio:</strong> ${service.name}</li>
            <li><strong>Frecuencia:</strong> ${subscription.frequency}</li>
            <li><strong>Fecha de inicio:</strong> ${new Date(subscription.startDate).toLocaleDateString()}</li>
            ${subscription.endDate ? `<li><strong>Fecha de fin:</strong> ${new Date(subscription.endDate).toLocaleDateString()}</li>` : ''}
          </ul>
          <p>Ya puedes disfrutar de todos los beneficios de este servicio.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.WEBSITE_URL || `${process.env.HOST}/dashboard`}" style="background-color: #003366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ir a Mi Dashboard</a>
          </div>
          <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de aprobación de suscripción enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de aprobación de suscripción:', error);
    return false;
  }
};

// Correo de rechazo de suscripción
const sendSubscriptionRejectionEmail = async (user, subscription, service, reason = '') => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: 'Información sobre tu solicitud de suscripción - Caracas Flight Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">Actualización de tu Solicitud de Suscripción</h1>
          <p>Hola ${user.firstName},</p>
          <p>Lamentamos informarte que tu solicitud de suscripción al servicio <strong>${service.name}</strong> no ha sido aprobada en este momento.</p>
          ${reason ? `<p><strong>Motivo:</strong> ${reason}</p>` : ''}
          <p>Si crees que ha habido un error o deseas más información, por favor contáctanos respondiendo a este correo.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de rechazo de suscripción enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de rechazo de suscripción:', error);
    return false;
  }
};

// Correo de cancelación de suscripción
const sendSubscriptionCancellationEmail = async (user, subscription, service) => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: 'Confirmación de cancelación de suscripción - Caracas Flight Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">Suscripción Cancelada</h1>
          <p>Hola ${user.firstName},</p>
          <p>Confirmamos que tu suscripción al servicio <strong>${service.name}</strong> ha sido cancelada según tu solicitud.</p>
          <p>Detalles de la suscripción cancelada:</p>
          <ul>
            <li><strong>Servicio:</strong> ${service.name}</li>
            <li><strong>Frecuencia:</strong> ${subscription.frequency}</li>
            <li><strong>Fecha de inicio:</strong> ${new Date(subscription.startDate).toLocaleDateString()}</li>
            ${subscription.endDate ? `<li><strong>Fecha de fin original:</strong> ${new Date(subscription.endDate).toLocaleDateString()}</li>` : ''}
            <li><strong>Fecha de cancelación:</strong> ${new Date().toLocaleDateString()}</li>
          </ul>
          <p>Si deseas reactivar esta suscripción en el futuro o tienes alguna pregunta, no dudes en contactarnos.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de cancelación de suscripción enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de cancelación de suscripción:', error);
    return false;
  }
};

// Correo de recordatorio de pago
const sendPaymentReminderEmail = async (user, subscription, service, daysRemaining) => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: 'Recordatorio de pago próximo - Caracas Flight Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">Recordatorio de Pago</h1>
          <p>Hola ${user.firstName},</p>
          <p>Te recordamos que el próximo pago de tu suscripción al servicio <strong>${service.name}</strong> está programado para dentro de <strong>${daysRemaining} días</strong>.</p>
          <p>Detalles de la suscripción:</p>
          <ul>
            <li><strong>Servicio:</strong> ${service.name}</li>
            <li><strong>Frecuencia:</strong> ${subscription.frequency}</li>
            <li><strong>Monto a pagar:</strong> ${service.price} ${service.currency || 'USD'}</li>
            <li><strong>Método de pago:</strong> ${subscription.paymentMethod || 'No especificado'}</li>
          </ul>
          <p>Por favor, asegúrate de tener fondos disponibles para el cargo automático o realiza el pago manualmente antes de la fecha límite para evitar interrupciones en tu servicio.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.WEBSITE_URL || `${process.env.HOST}/dashboard/payments`}" style="background-color: #003366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Gestionar Pagos</a>
          </div>
          <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de recordatorio de pago enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de recordatorio de pago:', error);
    return false;
  }
};

// Correo de confirmación de pago
const sendPaymentConfirmationEmail = async (user, subscription, service, paymentDetails) => {
  try {
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: 'Confirmación de pago recibido - Caracas Flight Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">Pago Confirmado</h1>
          <p>Hola ${user.firstName},</p>
          <p>Hemos recibido correctamente tu pago por la suscripción al servicio <strong>${service.name}</strong>.</p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Detalles del pago:</strong></p>
            <p><strong>Servicio:</strong> ${service.name}</p>
            <p><strong>Monto pagado:</strong> ${paymentDetails.amount} ${paymentDetails.currency || 'USD'}</p>
            <p><strong>Fecha de pago:</strong> ${new Date(paymentDetails.date).toLocaleString()}</p>
            <p><strong>Método de pago:</strong> ${paymentDetails.method}</p>
            <p><strong>ID de transacción:</strong> ${paymentDetails.transactionId}</p>
          </div>
          <p>Tu suscripción ha sido actualizada y continuará activa hasta el próximo ciclo de pago.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.WEBSITE_URL || `${process.env.HOST}/dashboard/payments`}" style="background-color: #003366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Ver Historial de Pagos</a>
          </div>
          <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de confirmación de pago enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de confirmación de pago:', error);
    return false;
  }
};

// Correo para recuperación de contraseña
const sendPasswordResetEmail = async (user, resetToken) => {
  try {
    // Crear la URL de restablecimiento con el token
    const resetUrl = `${process.env.WEBSITE_URL || `${process.env.HOST}`}/reset-password?token=${resetToken}`;
    
    await transporter.sendMail({
      from: 'caracas.flight.services.email@gmail.com',
      to: user.email,
      subject: 'Recuperación de contraseña - Caracas Flight Services',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h1 style="color: #003366; text-align: center;">Recuperación de Contraseña</h1>
          <p>Hola ${user.firstName},</p>
          <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Caracas Flight Services.</p>
          <p>Para continuar con el proceso de recuperación, haz clic en el siguiente botón:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #003366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
          </div>
          <p>Este enlace expirará en 1 hora por razones de seguridad.</p>
          <p>Si no solicitaste restablecer tu contraseña, puedes ignorar este correo. Tu cuenta sigue segura.</p>
          <p style="margin-top: 30px;">Saludos cordiales,</p>
          <p><strong>Equipo de Caracas Flight Services</strong></p>
        </div>
      `
    });
    console.log(`Correo de recuperación de contraseña enviado a ${user.email}`);
    return true;
  } catch (error) {
    console.error('Error al enviar correo de recuperación de contraseña:', error);
    return false;
  }
};


// Exportar todas las funciones
module.exports = {
  sendWelcomeEmail,
  notifyAdminsAboutNewUser,
  sendAccountApprovalEmail,
  sendAccountRejectionEmail,
  sendSubscriptionPendingEmail,
  notifyAdminsAboutNewSubscription,
  sendSubscriptionApprovalEmail,
  sendSubscriptionRejectionEmail,
  sendSubscriptionCancellationEmail,
  sendPaymentReminderEmail,
  sendPaymentConfirmationEmail,
  sendPasswordResetEmail
};
