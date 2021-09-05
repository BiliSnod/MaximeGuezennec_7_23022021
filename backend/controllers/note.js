const database = require("../models/database");  // importing database model
const Note = database.notes;  // 
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
exports.create = (req, res) => {

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
        res.status(500).send({ message: err.message || "La note n'a pas pu être créée." });
    });

};
/* --- Controller to create a new Note [x] --- */


/* --- Controller to modify an existing Note [o] --- */
exports.update = (req, res) => {

    const id = req.params.id;  // getting ID of the note from the query parameter

    Note.update(req.body, { where: { id: id } })  // using "update" method to modify note content with request body
    .then(num => {
        if (num == 1) {  // promise have to return "1"
            res.send({ message: "La note a été modifiée." });
        } else {
            res.send({ message: "La note n'a pa pu être modifiée." });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "La note n'a pa pu être modifiée." });
    });

};
/* --- Controller to update an existing Note [x] --- */


/* --- Controller to delete an existing Note [o] --- */
exports.delete = (req, res) => {

    const id = req.params.id;  // getting ID of the note from the query parameter

    Note.destroy({ where: { id: id } })  // using "destroy" method to delete identified note
    .then(num => {
        if (num == 1) {  // promise have to return "1"
        res.send({ message: "La note a été supprimée." });
        } else {
        res.send({ message: "La note n'a pa pu être supprimée." });
        }
    })
    .catch(err => {
        res.status(500).send({ message: "La note n'a pa pu être supprimée." });
    });

};
/* --- Controller to delete an existing Note [x] --- */


/* --- Controller to get an existing Note [o] --- */
exports.findOne = (req, res) => {

    const id = req.params.id;  // getting ID of the note from the query parameter
  
    Note.findByPk(id)  // using "findByPk" method to display data of the identified note (by its database primary key)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Impossible de récupérer la note." });
    });

};
/* --- Controller to get an existing Note [x] --- */


/* --- Controller to get all existing Note [o] --- */
exports.findAll = (req, res) => {

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
