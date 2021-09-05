const express = require("express");  // importing Express
// const mysql = require('mysql2');  // importing "mysql2" package for database connexion

// const userRoutes = require("./routes/user");  // importing user routes
const noteRoutes = require("./routes/note");  // importing note routes


const app = express();  // creating global variable with a method for Express application

app.use((req, res, next) => {  // handling CORS errors and Headers
    res.setHeader("Access-Control-Allow-Origin", "*");  // allowing access to any origin
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // allowed methods
    next();
});

app.use(express.urlencoded({ extended: true }));  // middleware to parse the URL-encoded data with "qs" library
app.use(express.json());  // middleware to transform request's body to JSON


const database = require("./models/database");
database.sequelize.sync();  // delete if dropping existing table (next line)
/* ------
// drop the table if it already exists
database.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});
------ */

// app.use("/api/auth", userRoutes);  // importing router for user authentification
app.use("/api/notes", noteRoutes);  // importing router for notes


module.exports = app;  // exporting application
