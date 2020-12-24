require("dotenv").config();

const username = process.env.NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const node_env = process.env.NODE_ENV;
const dialect = process.env.DIALECT;
const timezone = process.env.TIMEZONE;

const config = {
  dev: {
    username,
    password,
    database,
    host,
    dialect,
    timezone,
  },
  test: {},
  prod: {},
};

module.exports = config[node_env];
