module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Services', 'titulo', {
      type: Sequelize.STRING,
      allowNull: true // O false si es requerido
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('Services', 'titulo');
  }
};