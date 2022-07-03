'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     // this.belongsTo(models.user, {
      //  foreignKey: 'idUser',
      //  as: 'user'
      //});
   //   this.hasMany(models.content, {
       //   foreignKey: 'idPlaylist',
    //    as: 'content'
    //  });
    }
  }
  playlist.init({
   // idUser: DataTypes.INTEGER,
    playlistName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'playlist',
  });
  return playlist;
};