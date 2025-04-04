'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Subscriptions', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Subscriptions', 'status');
  }
};