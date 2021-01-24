'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manufacturer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Manufacturer.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    supportUrl: DataTypes.STRING,
    supportPhone: DataTypes.STRING,
    supportEmail: DataTypes.STRING,
    image: DataTypes.STRING,
    note: DataTypes.STRING
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Manufacturer',
  });
  return Manufacturer;
};