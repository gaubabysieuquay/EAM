"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/config.js");
const asset = require("./asset.js");
const db = {};

console.log(config);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    timezone: config.timezone,
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Associations
db.Role.belongsToMany(db.User, {
  through: "User_role",
  foreignKey: "roleId",
  otherKey: "userId",
  onDelete: "cascade",
});
db.User.belongsToMany(db.Role, {
  through: "User_role",
  foreignKey: "userId",
  otherKey: "roleId",
  onDelete: "cascade",
});

//1:M Asset-Supplier
db.Asset.belongsTo(db.Supplier, {
  onDelete: "cascade",
  foreignKey: "supplierId",
  targetKey: "id",
});
db.Supplier.hasMany(db.Asset, {
  onDelete: "cascade",
  foreignKey: "supplierId",
  targetKey: "id",
});

//1:M Asset-Location
db.Asset.belongsTo(db.Location, {
  onDelete: "cascade",
  foreignKey: "locationId",
  targetKey: "id",
});
db.Location.hasMany(db.Asset, {
  onDelete: "cascade",
  foreignKey: "locationId",
  targetKey: "id",
});

//1:M Accessory-Supplier
db.Accessory.belongsTo(db.Supplier, {
  onDelete: "cascade",
  foreignKey: "supplierId",
  targetKey: "id",
});
db.Supplier.hasMany(db.Accessory, {
  onDelete: "cascade",
  foreignKey: "supplierId",
  targetKey: "id",
});

//1:M Accessory-Location
db.Accessory.belongsTo(db.Location, {
  onDelete: "cascade",
  foreignKey: "locationId",
  targetKey: "id",
});
db.Location.hasMany(db.Accessory, {
  onDelete: "cascade",
  foreignKey: "locationId",
  targetKey: "id",
});

//1:M Accessory-Manufacturer
db.Accessory.belongsTo(db.Manufacturer, {
  onDelete: "cascade",
  foreignKey: "manufacturerId",
  targetKey: "id",
});
db.Manufacturer.hasMany(db.Accessory, {
  onDelete: "cascade",
  foreignKey: "manufacturerId",
  targetKey: "id",
});

//1:M Supplier-Asset_history
db.Asset_history.belongsTo(db.Supplier, {
  onDelete: "cascade",
  foreignKey: "supplierId",
  targetKey: "id",
});
db.Supplier.hasMany(db.Asset_history, {
  onDelete: "cascade",
  foreignKey: "supplierId",
  targetKey: "id",
});

//1:M Location-Asset_history
db.Asset_history.belongsTo(db.Location, {
  onDelete: "cascade",
  foreignKey: "locationId",
  targetKey: "id",
});
db.Location.hasMany(db.Asset_history, {
  onDelete: "cascade",
  foreignKey: "locationId",
  targetKey: "id",
});

//1:M Asset-Asset_history
db.Asset_history.belongsTo(db.Asset, {
  onDelete: "cascade",
  foreignKey: "assetId",
  targetKey: "id",
});
db.Asset.hasMany(db.Asset_history, {
  onDelete: "cascade",
  foreignKey: "assetId",
  targetKey: "id",
});

//1:M User-Location
db.Location.belongsTo(db.User, {
  onDelete: "cascade",
  foreignKey: "userId",
  targetKey: "id",
});
db.User.hasMany(db.Location, {
  onDelete: "cascade",  
  foreignKey: "userId",
  targetKey: "id",
});

//1:M License-Manufacturer
db.License.belongsTo(db.Manufacturer, {
  onDelete: "cascade",
  foreignKey: "manufacturerId",
  targetKey: "id",
});
db.Manufacturer.hasMany(db.License, {
  onDelete: "cascade",
  foreignKey: "manufacturerId",
  targetKey: "id",
});

//1:M License-Supplier
db.License.belongsTo(db.Supplier, {
  onDelete: "cascade",
  foreignKey: "supplierId",
  targetKey: "id",
});
db.Supplier.hasMany(db.License, {
  onDelete: "cascade",
  foreignKey: "supplierId",
  targetKey: "id",
});

//Trigger Asset
db.Asset.afterCreate((asset, options) => {
  db.Asset_history.create({
    assetId: asset.id,
    barcode: asset.barcode,
    name: asset.name,
    serial: asset.serial,
    model: asset.model,
    purchaseDate: asset.purchaseDate,
    purchaseCost: asset.purchaseCost,
    status: asset.status,
    expireDate: asset.expireDate,
    note: asset.note,
    image: asset.image,
    locationId: asset.locationId,
    supplierId: asset.supplierId,
  });
});

db.Asset.afterUpdate((asset, options) => {
  db.Asset_history.create({
    assetId: asset.id,
    barcode: asset.barcode,
    name: asset.name,
    serial: asset.serial,
    model: asset.model,
    purchaseDate: asset.purchaseDate,
    purchaseCost: asset.purchaseCost,
    status: asset.status,
    expireDate: asset.expireDate,
    note: asset.note,
    image: asset.image,
    locationId: asset.locationId,
    supplierId: asset.supplierId,
  });
});

db.Asset.afterDestroy((asset, options) => {
  db.Asset_history.create({
    assetId: asset.id,
    barcode: asset.barcode,
    name: asset.name,
    serial: asset.serial,
    model: asset.model,
    purchaseDate: asset.purchaseDate,
    purchaseCost: asset.purchaseCost,
    status: asset.status,
    expireDate: asset.expireDate,
    note: asset.note,
    image: asset.image,
    locationId: asset.locationId,
    supplierId: asset.supplierId,
  });
});

db.ROLES = ["user", "admin", "moderator"];

/*
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
});
*/

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection from database has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = db;
