const database = require("../models/database");  // importing database model
const Note = database.notes;  // 
const Op = database.Sequelize.Op;


/* --- Controller to create a new Note [o] --- */
exports.create = (req, res) => {

    console.log("req.body.title", req.body.title);
    console.log("req.body.content", req.body.content);

    if (!req.body.title) {
        res.status(400).send({ message: "Il faut obligatoirement un titre !" });
        return;
    }

    const note = {
        title: req.body.title,
        content: req.body.content //,
        //author: req.body.author,
    };
    
    Note.create(note)
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

    const id = req.params.id;

    Note.update(req.body, { where: { id: id } })
    .then(num => {
        if (num == 1) {
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

    const id = req.params.id;

    Note.destroy({ where: { id: id } })
    .then(num => {
        if (num == 1) {
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

    const id = req.params.id;
  
    Note.findByPk(id)
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

    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
    Note.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Impossible de récupérer les notes." });
    });

};
/* --- Controller to get all existing Note [x] --- */
