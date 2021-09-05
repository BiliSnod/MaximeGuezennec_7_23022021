module.exports = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
      max: 4,
      min: 0,
      acquire: 20000,
      idle: 10000
    }
  };
  