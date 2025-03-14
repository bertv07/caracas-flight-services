'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Los documentos pertenecen a un usuario
      Documents.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Documents.init(
    {
      // Foto de perfil (URL o ruta del archivo)
      profilePhoto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Foto de verificación (URL o ruta del archivo)
      verificationPhoto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Foto de cédula o pasaporte (URL o ruta del archivo)
      idPhoto: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Documents',
    }
  );

  return Documents;
};