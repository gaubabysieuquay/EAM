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
      assetId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      warranty: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Asset_history",
    }
  );
  return Asset_history;
};
