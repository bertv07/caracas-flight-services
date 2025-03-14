'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación con las suscripciones (un usuario puede tener muchas suscripciones)
      User.hasMany(models.Subscription, { foreignKey: 'userId' });

      // Relación con los documentos (un usuario tiene un conjunto de documentos)
      User.hasOne(models.Documents, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      // Información básica del usuario
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // Credenciales de acceso
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      // Rol del usuario (admin o pilot)
      role: {
        type: DataTypes.ENUM('admin', 'pilot'),
        allowNull: false,
        defaultValue: 'pilot', // Por defecto, todos son pilotos
      },

      // Estado de aprobación del piloto
      status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'pending', // Por defecto, pendiente de aprobación
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};