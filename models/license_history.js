"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class License_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  License_history.init(
    {
      name: DataTypes.STRING,
      seat: DataTypes.INTEGER,
      availableSeat: DataTypes.INTEGER,
      productKey: DataTypes.STRING,
      purchaseDate: DataTypes.DATE,
      purchaseCost: DataTypes.INTEGER,
      expireDate: DataTypes.DATE,
      note: DataTypes.STRING,
      licenseId: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "License",
          key: "id",
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "User",
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
      manufacturerId: {
        type: DataTypes.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Manufacturer",
          key: "id",
        },
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "License_history",
    }
  );
  return License_history;
};
