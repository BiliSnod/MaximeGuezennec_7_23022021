const database = require("../models/database");
const config = require("../config/auth");

const User = database.users;
const Role = database.roles;

const Op = database.Sequelize.Op;

let jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");


/* --- --- */
exports.signup = (req, res) => {
    
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        
        if (req.body.roles) {
            Role.findAll({ where: { level: { [Op.or]: req.body.roles } } })
            .then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({ message: "Utilisateur enregistré !" }); 
                });
            });
        } else {
            // user role = 1
            user.setRoles([1]).then(() => {
                res.send({ message: "Utilisateur enregistré !" });
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
/* --- --- */


/* --- --- */
exports.login = (req, res) => {

    User.findOne({ where: { email: req.body.email } })
    .then(user => {

        if (!user) {
            return res.status(404).send({ message: "Utilisateur non trouvé." });
        }

        let passwordConfirmed = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordConfirmed) {
            return res.status(401).send({ accessToken: null, message: "Mot de passe non reconnu." });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        var rank = [];
        user.getRoles().then(roles => {

            for (let i = 0; i < roles.length; i++) {
                rank.push("ROLE_" + roles[i].level.toUpperCase());
            }

            res.status(200).send({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: rank,
                accessToken: token
            });

        });

    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });

};
/* --- --- */
