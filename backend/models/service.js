// service.js
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model { // <-- Define la clase Service
    static associate(models) {
      Service.hasMany(models.Subscription, { foreignKey: "serviceId" });
    }
  }

  Service.init(
    {
      // Solo campos existentes en la base de datos
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Service",
    }
  );

  return Service; // <-- Exporta correctamente
};