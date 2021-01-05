"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Asset_histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      assetId: {
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Assets",
          key: "id",
        },
      },
      status: {
        type: Sequelize.INTEGER,
      },
      expireDate: { 
        type: Sequelize.DATE 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Asset_histories");
  },
};
