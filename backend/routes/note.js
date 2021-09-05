const express = require("express");  // importing Express
const router = express.Router();  // using "Router" function of Express to create new router object

const noteCtrl = require("../controllers/note");  // calling the controllers for notes
// const auth = require("../middlewares/auth");  // calling the authentication middleware to allow access by logging in
// const multer = require("../middlewares/multer");  // calling the "multer" middleware for file upload


/* --- routes for each functionality [o] --- */
router.post("/", /*auth, multer,*/ noteCtrl.create);
// router.post("/comment", /*auth,*/ noteCtrl.createComment);
router.put("/:id", /*auth, multer,*/ noteCtrl.update);
// router.put("/comment/:id", /*auth,*/ noteCtrl.modifyComment);
router.delete("/:id", /*auth,*/ noteCtrl.delete);
// router.delete("/comment/:id", /*auth,*/ noteCtrl.deleteComment);
router.get("/:id", /*auth,*/ noteCtrl.findOne);
router.get("/", /*auth,*/ noteCtrl.findAll);
/* --- routes for each functionality [x] --- */


module.exports = router;  // exporting router to other files
