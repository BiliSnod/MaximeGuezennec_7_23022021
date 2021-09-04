const express = require("express");  // importing Express
const mysql = require('mysql2');  // importing "mysql2" package for database connexion

const userRoutes = require("./routes/user");  // importing user routes
const noteRoutes = require("./routes/note");  // importing note routes


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


const app = express();  // creating global variable with a method for Express application

app.use("/api/auth", userRoutes);  // importing router for user authentification
app.use("/api/notes", noteRoutes);  // importing router for notes


module.exports = app;  // exporting application