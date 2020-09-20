'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      barcode: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      serial: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      origin: {
        type: Sequelize.STRING
      },
      purchaseCost: {
        type: Sequelize.INTEGER
      },
      warranty: {
        type: Sequelize.DATE
      },
      note: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Assets');
  }
};