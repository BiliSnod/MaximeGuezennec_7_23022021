const jwt = require("jsonwebtoken");  // importing "jsonwebtoken" package
const config = require("../config/auth");  // importing JWT secret


verifyToken = (req, res, next) => {

    let token = req.get("X-Access-Token");  // searching token in headers

    if (!token) {
        return res.status(403).send({ message: "Pas de token envoyé." });
    }

    jwt.verify(token, config.secret, (err, decoded) => {  // using JWT verify method to decode token with secret
        
        if (err) {
            return res.status(401).send({ message: "Accès refusé." });
        }
        
        req.userId = decoded.id;  //  setting ID from request to be same as ID in token
        next();  // passing to next middleware

    });
};

module.exports = verifyToken;
