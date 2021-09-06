const express = require("express");  // importing Express
const router = express.Router();  // using "Router" function of Express to create new router object

const noteCtrl = require("../controllers/note");  // calling the controllers for notes
// const auth = require("../middlewares/auth");  // calling the authentication middleware to allow access by logging in
// const multer = require("../middlewares/multer");  // calling the "multer" middleware for file upload


/* --- routes for each functionality [o] --- */
router.post("/", /*auth, multer,*/ noteCtrl.createNote);
router.post("/:noteId/comments", /*auth,*/ noteCtrl.createComment);
router.put("/:noteId", /*auth, multer,*/ noteCtrl.updateNote);
router.put("/:noteId/comments/:commentId", /*auth,*/ noteCtrl.updateComment);
router.delete("/:noteId", /*auth,*/ noteCtrl.deleteNote);
router.delete("/:noteId/comments/:commentId", /*auth,*/ noteCtrl.deleteComment);
router.get("/:noteId", /*auth,*/ noteCtrl.findOneNote);
router.get("/:noteId/comments", /*auth,*/ noteCtrl.findOneNoteWithComments);
router.get("/:noteId/comments/:commentId", /*auth,*/ noteCtrl.findOneComment);
router.get("/", /*auth,*/ noteCtrl.findAllNotes);
/* --- routes for each functionality [x] --- */


module.exports = router;  // exporting router to other files
