const Sequelize = require("sequelize");  // importing "Sequelize" module to interact with database

const databaseConfig = require("../config/database.js");  // getting data from configuration file

const sequelize = new Sequelize(databaseConfig.database, databaseConfig.username, databaseConfig.password, {
    host: databaseConfig.host,
    dialect: databaseConfig.dialect,
    pool: {  // configuration of connections in pool
        min: databaseConfig.pool.min,
        max: databaseConfig.pool.max,
        acquire: databaseConfig.pool.acquire,
        idle: databaseConfig.pool.idle
    }
});


const database = {};
database.Sequelize = Sequelize;  // Sequelize library
database.sequelize = sequelize;  // instance of Sequelize
;
database.comments = require("./comment.js")(sequelize, Sequelize);
database.notes = require("./note.js")(sequelize, Sequelize);
database.roles = require("./role.js")(sequelize, Sequelize);
database.users = require("./user.js")(sequelize, Sequelize);

database.notes.belongsTo(database.users, {  // using "belongsTo" method to link a note with a user
    foreignKey: "userId"
});

database.notes.hasMany(database.comments, { as: "comments" });  // using "hasMany" method to allow notes to have comments
database.comments.belongsTo(database.notes, {  // using "belongsTo" method to link a comment with a unique note
    foreignKey: "noteId"
});

database.comments.belongsTo(database.users, {  // using "belongsTo" method to link a comment with a user
    foreignKey: "userId"
});

database.users.belongsToMany(database.roles, {  // using "belongsToMany" method to link user and role
    through: "user_roles",  // TODO rename as user_role ?
    foreignKey: "userId",
    otherKey: "roleId"
});

database.roles.belongsToMany(database.users, {  // using "belongsToMany" method to link role and user
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});

database.ROLES = ["user", "admin"];  // existing roles


module.exports = database;  // exporting the model
