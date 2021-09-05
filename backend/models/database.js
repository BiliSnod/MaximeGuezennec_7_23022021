
const Sequelize = require("sequelize");  // importing "Sequelize" module to interact with database

const databaseConfig = require("../config/database.js");  // getting data from configuration file

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    pool: {  // configuration of connections in pool
        max: databaseConfig.pool.max,
        min: databaseConfig.pool.min,
        acquire: databaseConfig.pool.acquire,
        idle: databaseConfig.pool.idle
    }
});

const database = {};
database.Sequelize = Sequelize;
database.sequelize = sequelize;

// database.users = require("./user.js")(sequelize, Sequelize);
database.notes = require("./note.js")(sequelize, Sequelize);

module.exports = database;  // exporting the model