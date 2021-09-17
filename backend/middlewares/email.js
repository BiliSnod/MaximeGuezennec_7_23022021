const validator = require("email-validator");  // importing email-validator package


const verifyEmail = (req, res, next) => {

    // console.log(validator.validate(req.body.email));
    
    if (validator.validate(req.body.email) === true) { // testing request's email and passing to the next middleware in case it succeeds
        next();
        return;
    } else {
        res.status(400).send({ message: "Le format de cet email n'est pas valide." });
        return;
    };

};


module.exports = verifyEmail;
