const jwt = require("jsonwebtoken");  // importing "jsonwebtoken" package
const config = require("../config/auth");
const database = require("../models/database");
const User = database.users;


verifyToken = (req, res, next) => {

    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "Pas de token envoyé." });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        
        if (err) {
            return res.status(401).send({ message: "Accès refusé." });
        }
        
        req.userId = decoded.id;
        next();

    });
};


isAdmin = (req, res, next) => {

    User.findByPk(req.userId)
    .then(user => {
        user.getRoles().then(roles => {

            for (let i = 0; i < roles.length; i++) {

                if (roles[i].name === "admin") {
                    next();
                    return;
                }

            }

            res.status(403).send({ message: "Réservé à l'admin." });
            return;

        });
    });
};


const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};


module.exports = authJwt;
