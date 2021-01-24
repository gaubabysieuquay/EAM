'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Licenses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      productKey: {
        type: Sequelize.STRING
      },
      seat: {
        type: Sequelize.INTEGER
      },
      purchaseDate: {
        type: Sequelize.DATE
      },
      purchaseCost: {
        type: Sequelize.INTEGER
      },
      expireDate: {
        type: Sequelize.DATE
      },
      note: {
        type: Sequelize.STRING
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
      manufacturerId: {
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Manufacturers",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Licenses');
  }
};