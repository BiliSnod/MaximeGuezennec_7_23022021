const express = require("express");  // importing Express
const router = express.Router();  // using "Router" function of Express to create new router object

const noteCtrl = require("../controllers/note");  // calling the controllers for notes

const levelCheck = require("../middlewares/level");  // calling the admin middleware only to allow administrator
const verifyToken = require("../middlewares/auth");  // calling the authentication middleware to allow access by logging in
const multer = require("../middlewares/multer");  // calling the "multer" middleware for file upload


/* --- Routes for each functionality [o] --- */
router.post("/", verifyToken, multer, noteCtrl.createNote);
router.post("/:noteId/comments", verifyToken, noteCtrl.createComment);
router.put("/:noteId", verifyToken, levelCheck, noteCtrl.updateNote);
router.delete("/:noteId", verifyToken, levelCheck, noteCtrl.deleteNote);
router.delete("/comments/:commentId", verifyToken, levelCheck, noteCtrl.deleteComment);
router.get("/:noteId", verifyToken, noteCtrl.findOneNote);
router.get("/:noteId/comments", verifyToken, noteCtrl.findOneNoteWithComments);
router.get("/comments/:commentId", verifyToken, noteCtrl.findOneComment);
router.get("/", verifyToken, noteCtrl.findAllNotes);
/* --- Routes for each functionality [x] --- */


module.exports = router;  // exporting router to other files
