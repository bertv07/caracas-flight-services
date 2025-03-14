'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un servicio puede estar en muchas suscripciones
      Service.hasMany(models.Subscription, { foreignKey: 'serviceId' });
    }
  }

  Service.init(
    {
      // Nombre del servicio
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Descripción del servicio
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // Precio del servicio
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );

  return Service;
};