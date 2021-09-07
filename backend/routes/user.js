const express = require("express");  // importing Express
const router = express.Router();  // using "Router" function of Express to create new router object

const userCtrl = require("../controllers/user");  // calling the controllers for users

const verifyEmail = require("../middlewares/user");  // importing middleware to verify if email address already exists


/* --- routes for each functionality [o] --- */
router.post("/signup", verifyEmail, userCtrl.signup);
router.post("/login", userCtrl.login);
/* --- routes for each functionality [x] --- */


module.exports = router;  // exporting router to other files
