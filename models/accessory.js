"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Accessory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Accessory.init(
    {
      name: DataTypes.STRING,
      model: DataTypes.STRING,
      purchaseDate: DataTypes.DATE,
      purchaseCost: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      availableQTY: DataTypes.INTEGER,
      checkDate: DataTypes.DATE,
      note: DataTypes.STRING,
      image: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "User",
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
      supplierId: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Supplier",
          key: "id",
        },
      },
      locationId: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Location",
          key: "id",
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Accessory",
    }
  );
  return Accessory;
};
