const express = require("express");  // importing Express

const authRoutes = require("./routes/auth");  // importing user routes
const userRoutes = require("./routes/user");  // importing user routes
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
const Role = database.roles;

// database.sequelize.sync();  // delete if dropping existing table (next line)
/* ------ */
// drop the table if it already exists
database.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync database.");
    initial();
});
/* ------ */


app.use("/api/auth", authRoutes);  // importing router for authentication
app.use("/api/user", userRoutes);  // importing router for user
app.use("/api/notes", noteRoutes);  // importing router for notes


function initial() {
    Role.create({
        id: 1,
        level: "user"
    });
   
    Role.create({
        id: 2,
        level: "admin"
    });
}


module.exports = app;  // exporting application
