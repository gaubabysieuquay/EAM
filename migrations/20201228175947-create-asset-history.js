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
      barcode: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      serial: {
        type: Sequelize.STRING,
      },
      model: {
        type: Sequelize.STRING,
      },
      purchaseDate: {
        type: Sequelize.DATE,
      },
      purchaseCost: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      expireDate: {
        type: Sequelize.DATE,
      },
      note: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      locationId: {
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Locations",
          key: "id",
        },
      },
      supplierId: {
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Suppliers",
          key: "id",
        },
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
