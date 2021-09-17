const express = require("express");  // importing Express
const router = express.Router();  // using "Router" function of Express to create new router object

const userCtrl = require("../controllers/user");  // calling the controllers for users

const passwordTest = require("../middlewares/password");  // importing middleware to verify if email address already exists
const verifyEmail = require("../middlewares/email");  // importing middleware to verify if email address already exists
const emailDuplicate = require("../middlewares/user");  // importing middleware to verify if email address already exists


/* --- Routes for each functionality [o] --- */
router.post("/signup", emailDuplicate, verifyEmail, passwordTest, userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/users/:userId", userCtrl.deleteUser);
router.get("/users/:userId", userCtrl.findOneUser);
router.get("/users", userCtrl.findAllUsers);
/* --- Routes for each functionality [x] --- */


module.exports = router;  // exporting router to other files
