module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primero verificamos si la columna status ya existe
    const tableInfo = await queryInterface.describeTable("Subscriptions")

    if (tableInfo.status) {
      // Si la columna existe, modificamos el tipo para incluir 'cancel' y 'cancelled'
      return queryInterface.changeColumn("Subscriptions", "status", {
        type: Sequelize.ENUM("pending", "approved", "rejected", "cancel", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      })
    } else {
      // Si la columna no existe, la creamos
      return queryInterface.addColumn("Subscriptions", "status", {
        type: Sequelize.ENUM("pending", "approved", "rejected", "cancel", "cancelled"),
        allowNull: false,
        defaultValue: "pending",
      })
    }
  },

  down: async (queryInterface, Sequelize) => {
    // En caso de rollback, volvemos al estado anterior
    const tableInfo = await queryInterface.describeTable("Subscriptions")

    if (tableInfo.status) {
      return queryInterface.changeColumn("Subscriptions", "status", {
        type: Sequelize.ENUM("pending", "approved", "rejected"),
        allowNull: false,
        defaultValue: "pending",
      })
    }
  },
}

