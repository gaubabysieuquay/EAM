"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Accessory_histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
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
      quantity: {
        type: Sequelize.INTEGER,
      },
      availableQTY: {
        type: Sequelize.INTEGER,
      },
      checkDate: {
        type: Sequelize.DATE,
      },
      note: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      accessoryId: {
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Accessories",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Users",
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
      supplierId: {
        type: Sequelize.INTEGER,
        onDelete: "cascade",
        onUpdate: "cascade",
        references: {
          model: "Suppliers",
          key: "id",
        },
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Accessory_histories");
  },
};
