require('dotenv').config();
const mysql = require('mysql2');
const env = process.env;

const development = {
  username: env.SQLUSERNAME,
  password: env.SQLPASSWORD,
  database: env.SQLDATABASE,
  host: env.SQLHOST,
  dialect: mysql
};

const production = {
    username: env.SQLUSERNAME,
    password: env.SQLPASSWORD,
    database: env.SQLDATABASE,
    host: env.SQLHOST,
    dialect: env.SQLDIALECT,
  };
  
  const test = {
    username: env.SQLUSERNAME,
    password: env.SQLPASSWORD,
    database: env.SQLDATABASE,
    host: env.SQLHOST,
    dialect: env.SQLDIALECT,
  };

module.exports = { development, production, test };

// "development": {
//     "username": "root",
//     "password": "rlawjdtjs0",
//     "database": "tdl",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "test": {
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
