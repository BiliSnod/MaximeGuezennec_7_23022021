const express = require("express");  // importing Express
const mysql = require('mysql2');  // importing "mysql2" package for database connexion

const app = express();  // creating global variable with a method for Express application

/* --- Connection to database [o] --- */
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected!');
});
/* --- Connection to database [x] --- */

module.exports = app;  // exporting application