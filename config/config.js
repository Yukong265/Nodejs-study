require('dotenv').config();
const env = process.env;
 
const development = {
  username: env.SQLUSERNAME,
  password: env.SQLPASSWORD,
  database: env.SQLDATABASE,
  dialect: mysql,
  host: env.SQLHOST
};

module.exports = development;