"use strict";
const { Model } = require("sequelize");
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
  }
  Asset.init(
    {
      barcode: DataTypes.STRING,
      name: DataTypes.STRING,
      serial: DataTypes.STRING,
      model: DataTypes.STRING,
      purchaseDate: DataTypes.DATE,
      purchaseCost: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      warranty: DataTypes.INTEGER,
      note: DataTypes.STRING,
      image: DataTypes.STRING,
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
      modelName: "Asset",
    }
  );
  return Asset;
};
