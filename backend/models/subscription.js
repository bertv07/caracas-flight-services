const { Model } = require("sequelize") // <- Usa require

module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      // Una suscripción pertenece a un usuario
      Subscription.belongsTo(models.User, { foreignKey: "userId", as: "User" })

      // Una suscripción pertenece a un servicio
      Subscription.belongsTo(models.Service, { foreignKey: "serviceId", as: "Service" })
    }
  }

  Subscription.init(
    {
      // Frecuencia de pago (mensual, trimestral, semestral)
      frequency: {
        type: DataTypes.STRING,
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
      // Método de pago (paypal, pagomovil, efectivo)
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Detalles del pago (JSON)
      paymentDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // Estado de la suscripción (pending, approved, rejected, cancel)
      status: {
        type: DataTypes.ENUM("pending", "approved", "rejected", "cancel", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      },
      // Referencias a otras tablas
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Services",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Subscription",
    },
  )

  return Subscription
}

