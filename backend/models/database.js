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

database.users.hasMany(database.notes, { as: "notes", onDelete: "cascade" });  // using "hasMany" method to allow users to have notes linked to them and deleted in cascade
database.users.hasMany(database.comments, { as: "comments", onDelete: "cascade" });  // using "hasMany" method to allow users to have comments linked to them and deleted in cascade
database.notes.belongsTo(database.users, { foreignKey: "userId" });  // using "belongsTo" method to link a note with a user to get its ID
database.notes.belongsTo(database.users, { targetKey: "firstname", foreignKey: "firstname" });  // using "belongsTo" method to link a note with a user to get its ID
database.notes.belongsTo(database.users, { targetKey: "lastname", foreignKey: "lastname" });  // using "belongsTo" method to link a note with a user to get its ID

database.notes.hasMany(database.comments, { as: "comments", onDelete: "cascade" });  // using "hasMany" method to allow notes to have comments linked to them and deleted in cascade
database.comments.belongsTo(database.notes, { foreignKey: "noteId" });  // using "belongsTo" method to link a comment with a unique note
database.comments.belongsTo(database.users, { foreignKey: "userId" });  // using "belongsTo" method to link a comment with a user
database.comments.belongsTo(database.users, { targetKey: "firstname", foreignKey: "firstname" });  // using "belongsTo" method to link a note with a user to get its ID
database.comments.belongsTo(database.users, { targetKey: "lastname", foreignKey: "lastname" });  // using "belongsTo" method to link a note with a user to get its ID

database.users.belongsToMany(database.roles, { through: "user_roles", foreignKey: "userId", otherKey: "roleId" });  // using "belongsToMany" method to link user and role through "user_roles" table
database.roles.belongsToMany(database.users, { through: "user_roles", foreignKey: "roleId", otherKey: "userId" });  // using "belongsToMany" method to link role and user through "user_roles" table

database.ROLES = ["user", "admin"];  // existing roles


module.exports = database;  // exporting the model
