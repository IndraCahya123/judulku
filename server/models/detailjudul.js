'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailJudul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DetailJudul.init({
    judulId: DataTypes.INTEGER,
    value: DataTypes.STRING,
    score: DataTypes.FLOAT,
    dospemStatus: DataTypes.STRING,
    kaprodiStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DetailJudul',
  });
  return DetailJudul;
};