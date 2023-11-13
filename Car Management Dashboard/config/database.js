const knex = require("knex");
require("dotenv").config();

const database = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    database: process.env.DB_NAME,
    password: process.env.PASSWORD || "",
  },
  searchPath: ["public"], // schema
});

module.exports = database;
