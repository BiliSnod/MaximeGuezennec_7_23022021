const passwordValidator = require("password-validator");  // importing Password Validator package


const passwordTest = (req, res, next) => {

    const schema = new passwordValidator();  // defining new schema for password validation
    schema
        .is().min(8)  // minimum character length
        .is().max(40)  // maximum character length
        .has().uppercase()  // need to have uppercase letters
        .has().lowercase()  // need to have lowercase letters
        .has().digits(2)  // minimal number of digits
        .has().symbols(1)  // minimal number of symbols
        .has().not().spaces()  // exclude spaces
        .is().not().oneOf(["P4ssw0rd", "Azerty123", "Qwerty123"]);  // exclude certain simple passwords
    // console.log(schema.validate(req.body.password));

    if (schema.validate(req.body.password) === true) { // testing request's password and passing to the next middleware in case it succeeds
        next();
        return;
    } else {
        res.status(400).send({ message: "Le format de ce mot de passe n'est pas valide." });
        return;
    };

};


module.exports = passwordTest;
