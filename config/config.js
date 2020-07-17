require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.dbPass,
    database: "plasmaDB",
    host: "localhost",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "testdb",
    host: "localhost",
    dialect: "mysql",
    logging: false
  },
  production: {
    useEnvVariable: "JAWSDB_URL",
    dialect: "mysql"
  }
};
