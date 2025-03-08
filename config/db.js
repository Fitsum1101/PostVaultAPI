const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "locahost",
  user: "root",
  database: "socialmedia",
  password: "1234",
});

module.exports = pool.promise();
