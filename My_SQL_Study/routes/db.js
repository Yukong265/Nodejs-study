var mysql = require('mysql');
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rlawjdtjs0',
  database: 'workbenchs'
});

module.exports = db;
