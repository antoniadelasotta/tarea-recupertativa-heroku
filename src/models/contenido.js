'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class contenido extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.playlist, {
        foreignKey: 'idPlaylist',
        as: 'playlist'
      });
    }
  }
  contenido.init({
   // idUser: DataTypes.INTEGER,
    idPlaylist: DataTypes.INTEGER,
    name: DataTypes.STRING,
    aplication: DataTypes.STRING,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'contenido',
  });
  return contenido;
};