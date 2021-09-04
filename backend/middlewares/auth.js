const jwt = require("jsonwebtoken");  // importing "jsonwebtoken" package

module.exports = (req, res, next) => {  // middleware to export before the controllers
    try {  // using try/catch to limit potential problems
        const token = req.headers.authorization.split(" ")[1];  // getting the token in the authorization header, creating an array with it and selecting the element after the space
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  // using "verify" method of "jsonwebtoken" to decode token with encryption key (stored in an environment variable)
        const userId = decodedToken.userId;  // getting the user ID in the decoded token
        if (req.body.userId && req.body.userId !== userId) {  // verifying if user ID in request is the same as the one in token
            throw "Identifiant utilisateur non reconnu !";
        } else {  // when user IDs are matching
            next();  // allow to pass to the next middleware (controllers)
        }
    } catch (error) {  // if authentication fail
        res.status(401).json({ error: new Error("Requête non authentifiée !") });
    }
};
