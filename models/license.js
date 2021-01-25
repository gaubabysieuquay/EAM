'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class License extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  License.init({
    name: DataTypes.STRING,
    productKey: DataTypes.STRING,
    seat: DataTypes.INTEGER,
    availableSeat: DataTypes.INTEGER,
    purchaseDate: DataTypes.DATE,
    purchaseCost: DataTypes.INTEGER,
    expireDate: DataTypes.DATE,
    note: DataTypes.STRING,
    supplierId: {
      type: DataTypes.INTEGER,
      onDelete: "cascade",
      onUpdate: "cascade",
      references: {
        model: "Supplier",
        key: "id",
      },
    },
    manufacturerId: {
      type: DataTypes.INTEGER,
      onDelete: "cascade",
      onUpdate: "cascade",
      references: {
        model: "Manufacturer",
        key: "id",
      },
    },
  }, {
    sequelize,
    paranoid: true,
    modelName: 'License',
  });
  return License;
};