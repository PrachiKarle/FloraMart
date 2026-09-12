var mysql = require("mysql");
var util = require("util");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "floramart",
  port: 3306
});

conn.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected Successfully");
  }
});

var exe = util.promisify(conn.query).bind(conn);

module.exports = exe;