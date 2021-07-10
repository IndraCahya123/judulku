'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Judul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Judul.hasOne(models.DetailJudul, {
        onDelete: 'Cascade',
        onUpdate: 'Cascade',
      })
      Judul.hasMany(models.Comment, {
        onDelete: 'Cascade',
        onUpdate: 'Cascade',
      })
    }
  }
  Judul.init(
    {
      userId: DataTypes.INTEGER,
      judul: DataTypes.STRING,
      dospemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Judul',
    },
  )
  return Judul
}
