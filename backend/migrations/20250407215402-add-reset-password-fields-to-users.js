'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Primero verificamos si las columnas ya existen
      const tableInfo = await queryInterface.describeTable('Users');
      
      // Solo añadimos la columna si no existe
      if (!tableInfo.resetPasswordToken) {
        await queryInterface.addColumn('Users', 'resetPasswordToken', {
          type: Sequelize.STRING,
          allowNull: true
        });
      }
      
      if (!tableInfo.resetPasswordExpires) {
        await queryInterface.addColumn('Users', 'resetPasswordExpires', {
          type: Sequelize.DATE,
          allowNull: true
        });
      }
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Verificamos si las columnas existen antes de intentar eliminarlas
      const tableInfo = await queryInterface.describeTable('Users');
      
      if (tableInfo.resetPasswordToken) {
        await queryInterface.removeColumn('Users', 'resetPasswordToken');
      }
      
      if (tableInfo.resetPasswordExpires) {
        await queryInterface.removeColumn('Users', 'resetPasswordExpires');
      }
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
