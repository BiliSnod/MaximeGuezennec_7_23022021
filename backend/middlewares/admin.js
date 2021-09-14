const database = require("../models/database");  // importing "database" model
const User = database.users;  // defining "User" to be the "users" table in database


adminCheck = (req, res, next) => {

    User.findByPk(req.userId)  // finding users based on their database primary key
    .then(user => {

        user.getRoles()  // 
        .then(roles => {

            for (let i = 0; i < roles.length; i++) {

                if (roles[i].name === "admin") {  // checking if role matches "admin"
                    next();
                    return;
                }

            }

            res.status(403).send({ message: "Réservé à l'administrateur." });
            return;

        });

    });
    
};

module.exports = adminCheck;
