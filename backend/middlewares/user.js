const database = require("../models/database");  // importing database model

const User = database.users;  // importing model for users


const emailDuplicate = (req, res, next) => {

    User.findOne({ where: { email: req.body.email } })  // searching if a user with the request email address exists
    .then(user => {

        if (user) {
            res.status(400).send({ message: "Cette adresse e-mail est déjà utilisée." });
            return;
        }

        next();

    });

};


module.exports = emailDuplicate;
