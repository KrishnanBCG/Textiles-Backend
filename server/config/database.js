// const express = require('express');
// const router = express.Router();
// var db;
// var mysql = require('mysql2');

// var connection = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// connection.getConnection(function (err, database) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   } else {
//     console.log("database has been connected");
//     db = database;
//   }
// });
// module.exports = connection;

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 3, // Keep less than your hosting limit of 5
  queueLimit: 0
});

// Test connection once at startup
pool.getConnection((err, conn) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
  } else {
    console.log('Database has been connected');
    conn.release(); // Important: release after testing
  }
});

module.exports = pool;
