module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {  // defining the model to create users
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    });
  
    return User;

};