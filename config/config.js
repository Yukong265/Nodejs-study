const env = process.env;

const development = {
    username: env.SQLUSERANME,
    password: env.SQLUSERANME,
    database: env.SQLDATABASE,
    host: env.SQLHOST,
    dialect: env.SQLDIALECT
}

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