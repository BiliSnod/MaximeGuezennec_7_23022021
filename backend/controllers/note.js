const database = require("../models/database");  // importing database model
const fs = require("fs");  // importing "fs" package that enable modifications on file system

const Note = database.notes;  // importing model for notes
const Comment = database.comments;  // importing model for comments

const Op = database.Sequelize.Op;  // calling Sequelize operators


/* --- Controller to create a new Note [o] --- */
exports.createNote = (req, res) => {

    if (!req.body.title || !req.body.content || !req.file) {  // checking if a all required fields exist
        res.status(400).send({ message: "Il faut obligatoirement un titre et un contenu !" });
        return;
    }

    const note = {  // getting data from query to fill the Note model
        title: req.body.title,
        content: req.body.content,
        mediaUrl: `${req.protocol}://${req.get("host")}/medias/${req.file.filename}`,
        userId: req.body.userId,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };
    
    Note.create(note)  // using "create" method to send model to database
    .then(data => {

        res.status(200).send(data);

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
        message: req.body.message,
        noteId: req.body.noteId,
        userId: req.body.userId,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    };

    Comment.create(comment)
    .then(data => {

        res.status(200).send(data);

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
            res.status(400).send({ message: "La note n'a pas pu être modifiée." });
        }

    })
    .catch(err => {
        res.status(500).send({ message: "La note n'a pas pu être modifiée." });
    });

};
/* --- Controller to modify an existing Note [x] --- */


/* --- Controller to delete an existing Note [o] --- */
exports.deleteNote = (req, res) => {

    const id = req.params.noteId;  // getting ID of the note from the query parameter

    Note.findByPk(id, { include: ["comments"] })  // using "findByPk" method to find data of the identified note with its comments
    .then(note => {
        
        const filename = note.mediaUrl.split("/medias/")[1];  // using "split" method to get the media filename from the complete URL
        
        fs.unlink(`medias/${filename}`, () => {  // using "unlink" method from "fs" to delete the file

            Comment.destroy({where: { [Op.or]: [{ noteId: id }] }})  // deleting every comments which are linked with this note by searching its ID
            .then(() => {

                Note.destroy({ where: { id: id } })  // using "destroy" method to delete identified note
                .then(num => {

                    if (num == 1) {  // promise have to return "1"
                    res.status(200).send({ message: "La note a été supprimée." });
                    } else {
                    res.status(400).send({ message: "La note n'a pas pu être supprimée." });
                    }

                })
                .catch(err => {
                    res.status(500).send({ message: "La note n'a pas pu être supprimée." });
                });

            })
            .catch(err => {
                res.status(500).send({ message: "Impossible de trouver les commentaires." });
            });
            
        });

    })
    .catch(err => {
        res.status(500).send({ message: "Impossible de trouver la note." });
    });
    
};
/* --- Controller to delete an existing Note [x] --- */


/* --- Controller to delete an existing Comment [o] --- */
exports.deleteComment = (req, res) => {

    const id = req.params.commentId;  // getting ID of the note from the query parameter

    Comment.destroy({ where: { id: id } })  // using "destroy" method to delete identified note
    .then(num => {

        if (num == 1) {  // promise have to return "1"
        res.status(200).send({ message: "Le commentaire a été supprimé." });
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

        if(!data) {
            res.status(404).send({ message: "La note n'a pas été trouvée." });
        } else {
            res.status(200).send(data);
        }

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
        
        if(!note) {
            res.status(404).send({ message: "La note n'a pas été trouvée." });
        } else {
            res.status(200).send(note);
        }  

    })
    .catch((err) => {
        res.status(500).send({ message: "Impossible de récupérer la note." });
    });

};
/* --- Controller to get an existing Note with its Comments [x] --- */


/* --- Controller to get an existing Comment [o] --- */
exports.findOneComment = (req, res) => {

    const noteId = req.params.noteId;  // getting ID of the note from the query parameter
    const commentId = req.params.commentId;  // getting ID of the comment from the query parameter

    if (Note.findByPk(noteId, { include: ["comments"]})) {  // checking if the note exists and contain "comments" object
        Comment.findByPk(commentId)  // using "findByPk" method to display data of the identified note (by its database primary key)
        .then(data => {

            if(!data) {
                res.status(404).send({ message: "Le commentaire n'a pas été trouvé." });
            } else {
                res.status(200).send(data);
            }
            
        })
        .catch(err => {
            res.status(500).send({ message: "Impossible de récupérer la note." });
        });
    } else {        
        res.status(400).send({ message: "Cette note n'existe pas." });
        return;
    }

};
/* --- Controller to get an existing Note [x] --- */


/* --- Controller to get all existing Note [o] --- */
exports.findAllNotes = (req, res) => {

    const title = req.query.title;  // defining query's title
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;  // finding notes by their title
  
    Note.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: "Impossible de récupérer les notes." });
    });

};
/* --- Controller to get all existing Note [x] --- */
