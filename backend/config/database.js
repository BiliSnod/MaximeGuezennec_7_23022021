module.exports = {  // connecting to the MySQL database, with limitations
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
        min: 0,
        max: 4,
        acquire: 20000,
        idle: 10000
    }
};
