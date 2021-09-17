const database = require("../models/database");  // importing "database" model
const User = database.users;  // defining "User" to be the "users" table in database


const levelCheck = (req, res, next) => {

    User.findByPk(req.userId)  // finding users based on their database primary key
    .then(user => {

        user.getRoles()  // getting the user role
        .then(roles => {

            for (let role of roles) {
                if (role.level === "admin") {  // checking if role matches "admin"
                    console.log("ROLE", role.level)
                    next();
                    return;
                } else {
                    console.log("ROLE", role.level)
                    res.status(403).send({ message: "Réservé à l'administrateur." });
                    return;
                }
            }

        })
        .catch(err => {
            res.status(500).send({ message: "Le rôle n'a pas été trouvé." });
        });

    })
    .catch(err => {
        res.status(500).send({ error });
    });
    
};

module.exports = levelCheck;
