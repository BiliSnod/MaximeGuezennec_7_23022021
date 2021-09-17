const express = require("express");  // importing Express
const path = require("path");  // getting access to file system's path

const globalRateLimiter = require("./middlewares/request");  // importing "express-rate-limit" middleware
const helmet = require("helmet");  // importing Helmet package to secure HTTP headers

const authRoutes = require("./routes/user");  // importing user routes
const noteRoutes = require("./routes/note");  // importing note routes


const app = express();  // creating global variable with a method for Express application

app.use((req, res, next) => {  // handling CORS errors and Headers
    res.setHeader("Access-Control-Allow-Origin", "*");  // allowing access to any origin
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Access-Token, Access-Control-Allow-Headers, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");  // allowed methods
    next();
});

app.use(express.urlencoded({ extended: true }));  // middleware to parse the URL-encoded data with "qs" library
app.use(express.json());  // middleware to transform request's body to JSON

app.use(globalRateLimiter);  // middleware to limit number of requests
app.use(helmet());  // a set of default middlewares from Helmet


const database = require("./models/database");

database.sequelize.sync();  // synchronizing the database on requests [deactivate if reinitializing database (next function)}

/* --- Reinitialize database for testing [o] --- /
database.sequelize.sync({ force: true }).then(() => {
    console.log("Reinitialize database.");
    initial();
});

const Role = database.roles;  

function initial() {  // creating the two roles used
    Role.create({
        id: 1,
        level: "user"
    });
   
    Role.create({
        id: 2,
        level: "admin"
    });
}
/* --- Reinitialize database for testing [x] --- */

app.use("/medias", express.static(path.join(__dirname, "medias")));  // middleware to allow requests to access "medias" directory using the "static" method of Express, and the "path" method

app.use("/api/auth", authRoutes);  // importing router for authentication
app.use("/api/notes", noteRoutes);  // importing router for notes


module.exports = app;  // exporting application
