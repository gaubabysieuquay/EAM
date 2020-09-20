'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Asset.init({
    barcode: DataTypes.STRING,
    name: DataTypes.STRING,
    serial: DataTypes.STRING,
    unit: DataTypes.STRING,
    origin: DataTypes.STRING,
    purchaseCost: DataTypes.INTEGER,
    warranty: DataTypes.DATE,
    note: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Asset',
  });
  return Asset;
};