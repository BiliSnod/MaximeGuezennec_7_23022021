const express = require("express");  // importing Express
const router = express.Router();  // using "Router" function of Express to create new router objects

const userCtrl = require("../controllers/user");  // controllers association with routes for users

router.post("/signup", userCtrl.signup);  // post route using "signup" method on the controllers
router.post("/login", userCtrl.login);  // post route using "login" method on the controllers

module.exports = router;  // exporting user router
