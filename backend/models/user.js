module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {  // defining the model to create users
        firstname: {
            type: DataTypes.STRING,
            unique: true  // necessary for the targetKey/foreignKey to work on non-primaryKey
        },
        lastname: {
            type: DataTypes.STRING,
            unique: true  // necessary for the targetKey/foreignKey to work on non-primaryKey
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