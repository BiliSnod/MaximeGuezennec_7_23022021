const express = require("express");  // importing Express
const router = express.Router();  // using "Router" function of Express to create new router objects

const userCtrl = require("../controllers/user");  // calling the controllers for users


/* --- routes for each functionality [o] --- */
router.post("/signup", userCtrl.signup);  // post route using "signup" method on the controllers
router.post("/login", userCtrl.login);  // post route using "login" method on the controllers
/* --- routes for each functionality [x] --- */


module.exports = router;  // exporting user router
