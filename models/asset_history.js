"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Asset_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Asset_history.init(
    {
      assetId: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Asset",
          key: "id",
        },
      },
      barcode: DataTypes.STRING,
      name: DataTypes.STRING,
      serial: DataTypes.STRING,
      model: DataTypes.STRING,
      purchaseDate: DataTypes.DATE,
      purchaseCost: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      expireDate: DataTypes.DATE,
      note: DataTypes.STRING,
      image: DataTypes.STRING,
      locationId: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Location",
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
    },
    {
      sequelize,
      modelName: "Asset_history",
    }
  );
  return Asset_history;
};
