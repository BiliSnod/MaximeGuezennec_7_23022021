const http = require("http");  // import Node HTTP package
const app = require("./app");  // import application

const normalizePort = val => {  // function returning valid port if it is a string or number
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;

};
const port = normalizePort("3000");
app.set("port", port);  // define port for application

const errorHandler = error => {  // function searching for errors
    if (error.syscall !== "listen") {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);  // calling createServer method for HTTP, with application for argument

server.on("error", errorHandler);
server.on("listening", () => {  // event listener to register port in console
    const address = server.address();
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

server.listen(3000);  // method to listen only to port 3000
