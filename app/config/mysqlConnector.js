const mysql = require("mysql");

const connection = mysql.createConnection({
  multipleStatements: true,
  user: process.env.user,
  host: process.env.ip,
  password: process.env.pass,
  database: process.env.dbname,
  charset: process.env.charset
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("[MYSQL] connected!");
});

connection.query("CREATE DATABASE IF NOT EXISTS NetworkDATA; USE NetworkDATA; CREATE TABLE IF NOT EXISTS login_requests (sessionToken INT, webIp TEXT, mcIp TEXT, nickname TEXT, uuid TEXT, madeRequest BOOLEAN);", [1,2,3], (err) => {
  if (err) throw err;
});

module.exports = connection;