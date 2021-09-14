const rateLimit = require("express-rate-limit");  // importing Express Rate Limit package to limit number of requests

const globalRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,  // defining window size (1h in milliseconds)
    max: 1000,  // maximum number of request for this time frame
    message: "Vous avez dépassé la limite de requêtes !",
    headers: true,  // adding headers to the response showing the enforced limit
});

module.exports = globalRateLimiter;  // exporting the middleware
