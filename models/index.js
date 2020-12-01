"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config/config.js");
const db = {};

console.log(config);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
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
  through: "UserRole",
  foreignKey: "roleId",
  otherKey: "userId",
  onDelete: "cascade",
});
db.User.belongsToMany(db.Role, {
  through: "UserRole",
  foreignKey: "userId",
  otherKey: "roleId",
  onDelete: "cascade",
});

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
