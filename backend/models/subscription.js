'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Una suscripción pertenece a un usuario
      Subscription.belongsTo(models.User, { foreignKey: 'userId' });

      // Una suscripción pertenece a un servicio
      Subscription.belongsTo(models.Service, { foreignKey: 'serviceId' });
    }
  }

  Subscription.init(
    {
      // Frecuencia de pago (mensual, trimestral, semestral)
      frequency: {
        type: DataTypes.ENUM('mensual', 'trimestral', 'semestral'),
        allowNull: false,
      },
      // Fecha de inicio de la suscripción
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      // Fecha de finalización de la suscripción
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Subscription',
    }
  );

  return Subscription;
};