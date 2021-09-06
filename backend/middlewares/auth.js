const database = require("../models/database");

const ROLES = database.ROLES;
const User = database.users;


verifyEmail = (req, res, next) => {

    User.findOne({ where: { email: req.body.email } })
    .then(user => {

        if (user) {
            res.status(400).send({ message: "Cette adresse e-mail est déjà utilisée." });
            return;
        }

        next();

    });

};


verifyRole = (req, res, next) => {
    
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({ message: "Ce rôle n'existe pas : " + req.body.roles[i] });
                return;
            }
        }
    }
    
    next();

};

/*
const validateSignup = {
    verifyEmail: verifyEmail,
    verifyRole: verifyRole
};
console.log(validateSignup)
*/

module.exports = verifyEmail;
// module.exports = verifyRole;
