/*
const jwt = require("jsonwebtoken");  // importing "jsonwebtoken" package to verify token

const config = require("../config/auth");  // getting the JWT secret


module.exports = (req, res, next) => {  // middleware to export before the controllers
    try {  // using try/catch to limit potential problems
        const token = req.headers.accessToken;  // getting the token in the authorization header, creating an array with and selecting the element after the space
        const decodedToken = jwt.verify(token, config.secret);  // using "verify" method of "jsonwebtoken" to decode token with encryption key
        const userId = decodedToken.userId;  // getting the user ID in the decoded token
        if (req.body.userId && req.body.userId !== userId) {  // verifying if user ID in request is different of the one in token
            throw "User ID non valable !";  // returning an error message
        } else {  // user IDs are matching
            next();  // allow to pass to the next middleware (controllers)
        }
    } catch (error) {  // if authentication fail
        res.status(401).json({ message: "Requête non authentifiée !" });  // responding with an error message        
    }
};
*/


const jwt = require("jsonwebtoken");  // importing "jsonwebtoken" package
const config = require("../config/auth");  // importing JWT secret


verifyToken = (req, res, next) => {

    // let token = req.headers["x-access-token"];  // searching token in headers
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
