const database = require("../models/database");  // importing database model
const Note = database.notes;  // importing model for notes
const Comment = database.comments;  // importing model for comments
const Op = database.Sequelize.Op;  // calling Sequelize operators


/* --- Pagination functions [o] --- */
const getPage = (page, size) => {

    const limit = size ? +size : 5;  // defining default number of notes displayed on each page
    const offset = page ? page * limit : 0;  // defining default number of notes to skip

    return { limit, offset };
};

const getPageData = (data, page, limit) => {

    const { count: allNotes, rows: notes } = data;  // defining method properties name
    const currentPage = page ? +page : 0;  // defining actual page
    const allPages = Math.ceil(allNotes / limit);  // defining number of pages

    return { allNotes, notes, allPages, currentPage };
};
/* --- Pagination functions [x] --- */


/* --- Controller to create a new Note [o] --- */
exports.createNote = (req, res) => {

    if (!req.body.title) {  // checking if a title exists
        res.status(400).send({ message: "Il faut obligatoirement un titre !" });
        return;
    }

    const note = {  // getting data from query to fill the Note model
        title: req.body.title,
        content: req.body.content //,
        //author: req.body.author,
    };
    
    Note.create(note)  // using "create" method to send model to database
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "La note n'a pas pu être créée." });
    });

};
/* --- Controller to create a new Note [x] --- */


/* --- Controller to create a new Comment [o] --- */
exports.createComment = (req, res) => {

    if (!req.body.message) {  // checking if a title exists
        res.status(400).send({ message: "Il faut obligatoirement un message !" });
        return;
    }

    const comment = {  // getting data from query to fill the Note model
        author: req.body.author,
        message: req.body.message,
        noteId: req.body.noteId
    };

    Comment.create(comment)
    .then(data => {
        res.send(data);
    })
    .catch((err) => {
        res.status(500).send({ message: "Le commentaire n'a pas pu être envoyé." });
    });

};
/* --- Controller to create a new Comment [x] --- */


/* --- Controller to modify an existing Note [o] --- */
exports.updateNote = (req, res) => {

    const id = req.params.noteId;  // getting ID of the note from the query parameter

    Note.update(req.body, { where: { id: id } })  // using "update" method to modify note content with request body
    .then(num => {
        if (num == 1) {  // promise have to return "1"
            res.send({ message: "La note a été modifiée." });
        } else {
            res.status(400).send({ message: "La note n'a pa pu être modifiée." });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "La note n'a pa pu être modifiée." });
    });

};
/* --- Controller to modify an existing Note [x] --- */


/* --- Controller to modify an existing Comment [o] --- */
exports.updateComment = (req, res) => {

    const id = req.params.commentId;  // getting ID of the note from the query parameter

    Comment.update(req.body, { where: { id: id } })  // using "update" method to modify comment content with request body
    .then(num => {
        if (num == 1) {  // promise have to return "1"
            res.send({ message: "La commentaire a été modifié." });
        } else {
            res.status(400).send({ message: "Le commentaire n'a pas pu être modifiée." });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "La commentaire n'a pa pu être modifiée." });
    });

};
/* --- Controller to modify an existing Comment [x] --- */


/* --- Controller to delete an existing Note [o] --- */
exports.deleteNote = (req, res) => {

    const id = req.params.noteId;  // getting ID of the note from the query parameter

    Note.destroy({ where: { id: id } })  // using "destroy" method to delete identified note
    .then(num => {
        if (num == 1) {  // TODO promise have to return "1"
        res.send({ message: "La note a été supprimée." });
        } else {
        res.status(400).send({ message: "La note n'a pa pu être supprimée." });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "La note n'a pa pu être supprimée." });
    });

};
/* --- Controller to delete an existing Note [x] --- */


/* --- Controller to delete an existing Comment [o] --- */
exports.deleteComment = (req, res) => {

    const id = req.params.commentId;  // getting ID of the note from the query parameter

    Comment.destroy({ where: { id: id } })  // using "destroy" method to delete identified note
    .then(num => {
        if (num == 1) {  // promise have to return "1"
        res.send({ message: "Le commentaire a été supprimé." });
        } else {
        res.status(400).send({ message: "Le commentaire n'a pas pu être supprimé." });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "Le commentaire n'a pas pu être supprimé." });
    });

};
/* --- Controller to delete an existing Comment [x] --- */


/* --- Controller to get an existing Note [o] --- */
exports.findOneNote = (req, res) => {

    const id = req.params.noteId;  // getting ID of the note from the query parameter
  
    Note.findByPk(id)  // using "findByPk" method to display data of the identified note (by its database primary key)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Impossible de récupérer la note." });
    });

};
/* --- Controller to get an existing Note [x] --- */

/* --- Controller to get an existing Note with its Comments [o] --- */
exports.findOneNoteWithComments = (req, res) => {
    
    const noteId = req.params.noteId;  // getting ID of the note from the query parameter
    
    Note.findByPk(noteId, { include: ["comments"] })
    .then((note) => {
        res.send(note);
    })
    .catch((err) => {
        res.status(500).send({ message: err.message || "Impossible de récupérer la note." });
    });

};
/* --- Controller to get an existing Note with its Comments [x] --- */


/* --- Controller to get an existing Comment [o] --- */
exports.findOneComment = (req, res) => {

    const noteId = req.params.noteId;  // getting ID of the note from the query parameter
    const commentId = req.params.commentId;  // getting ID of the comment from the query parameter

    if ( Note.findByPk(noteId, { include: ["comments"]}) ) {  // TODO checking if the note exists  
        Comment.findByPk(commentId)  // using "findByPk" method to display data of the identified note (by its database primary key)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Impossible de récupérer la note." });
        });
    } else {        
        res.status(400).send({ message: "Cette note n'existe pas." });
        return;
    }

};
/* --- Controller to get an existing Note [x] --- */


/* --- Controller to get all existing Note [o] --- */
exports.findAllNotes = (req, res) => {

    const { page, size, title } = req.query;  // getting query current page
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;  // finding notes by their title

    const { limit, offset } = getPage(page, size);  // getting query current limit and offset
  
    Note.findAndCountAll({ where: condition, limit, offset })  // using "findAndCountAll" methode to display all existing notes filtered by query
    .then(data => {

        const response = getPageData(data, page, limit);  // defining then sending response
        res.send(response);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Impossible de récupérer les notes." });
    });

};
/* --- Controller to get all existing Note [x] --- */
