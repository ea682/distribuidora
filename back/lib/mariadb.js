const mysql = require('mysql');

const { config } = require('../config/index')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const PORT = encodeURIComponent(config.port);
const HOST = encodeURIComponent(config.dbHost);
const DATABASE = encodeURIComponent(config.dbDatabase);

const conn = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABASE,
  port: PORT,
  connectionLimit: 5
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = { conn };

