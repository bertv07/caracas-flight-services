'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Services', 'titulo', {
        type: Sequelize.STRING,
        allowNull: false, // O true si es opcional
    });
},
down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Services', 'titulo');
},
};
