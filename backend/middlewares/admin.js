const database = require("../models/database");
const User = database.users;


adminCheck = (req, res, next) => {

    User.findByPk(req.userId)
    .then(user => {

        user.getRoles()  // TODO (ne reconnait pas l'admin)
        .then(roles => {

            for (let i = 0; i < roles.length; i++) {

                if (roles[i].name === "admin") {
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
