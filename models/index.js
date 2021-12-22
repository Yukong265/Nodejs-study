"use strict";

const Sequelize = require("sequelize");
const Item = require("./item");
const User = require("./user");

const config = require("../config/config.js");
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = this.User;
db.Item = this.Item;

db.User = require("./user")(sequelize, Sequelize);
db.Item = require("./item")(sequelize, Sequelize);

db.User.hasMany(db.Item, { foreignKey: "username", targetKey: "username" });
db.Item.belongsTo(db.User, { foreignKey: "username"});

module.exports = db;
