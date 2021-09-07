const config = require("../config/auth");  // getting the JWT secret
const database = require("../models/database");  // importing database model

const User = database.users;  // importing model for users
const Role = database.roles;  // importing model for roles

const Op = database.Sequelize.Op;  // calling Sequelize operators

const jwt = require("jsonwebtoken");  // importing JSON Web Token package
const bcrypt = require("bcrypt");  // importing Bcryp package


/* --- Controller to create a new User [o] --- */
exports.signup = (req, res) => {
    
    User.create({  // filing the User model with request data 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)  // using the hash method of Bcrypt to encrypt the password, adding a salt
    })
    .then(user => {
        
        if (req.body.roles) {  // searching if the user can get an "admin" role
            Role.findAll({ where: { level: { [Op.or]: req.body.roles } } })
            .then(roles => {
                user.setRoles(roles).then(() => {  // setting the ID "2" in "roles" database table
                    res.send({ message: "Utilisateur enregistré !" }); 
                });
            });
        } else {  // giving the "user" role if it can't
            user.setRoles([1]).then(() => {  // setting the ID "1" in "roles" database table
                res.send({ message: "Utilisateur enregistré !" });
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};
/* --- Controller to create a new User [x] --- */


/* --- Controller for connection to user account [o] --- */
exports.login = (req, res) => {

    User.findOne({ where: { email: req.body.email } })  // searching if a user with request's email address already exists
    .then(user => {

        if (!user) {  // rejecting connection if the email address isn't found in database
            return res.status(404).send({ message: "Cet utilisateur n'existe pas." });
        } else {

            let passwordConfirmed = bcrypt.compareSync(  // comparing with Bcrypt request's password with the password in database for this user
            req.body.password,
            user.password
            );

            if (!passwordConfirmed) {  // rejecting connection if hashed email addresses dont match
                return res.status(401).send({ accessToken: null, message: "Mot de passe non reconnu." });
            } else {

                let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: "24h" });  // creating a connection token with JSON Web Token for 24 hours
    
                let rank = [];
                user.getRoles().then(roles => {
    
                    for (let i = 0; i < roles.length; i++) {  // defining the role for the user in the response
                        rank.push("ROLE_" + roles[i].level.toUpperCase());
                    }
    
                    res.status(200).send({  // response with an object describing the connected user
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        roles: rank,
                        accessToken: token
                    });
    
                });

            }
        
        };

    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });

};
/* --- Controller for connection to user account [x] --- */
