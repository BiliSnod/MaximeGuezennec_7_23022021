/*
const validateSignup = require("../middlewares/index");
const controller = require("../controllers/auth");

module.exports = function(app) {
    
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.post("/api/auth/signup", [ validateSignup.verifyEmail, validateSignup.verifyRole ], controller.signup);
    app.post("/api/auth/login", controller.login);

};
*/


const express = require("express");  // importing Express
const router = express.Router();  // using "Router" function of Express to create new router object

// const verifyRole = require("../middlewares/auth");
const verifyEmail = require("../middlewares/auth");
const authCtrl = require("../controllers/auth");  // calling the controllers for notes


/* --- routes for each functionality [o] --- */
router.post("/signup", verifyEmail, authCtrl.signup);
router.post("/login", /*auth, multer,*/ authCtrl.login);
/* --- routes for each functionality [x] --- */


module.exports = router;  // exporting router to other files
