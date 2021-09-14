module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {  // defining the model to create users
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  // necessary for the targetKey/foreignKey to work on non-primaryKey
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  // necessary for the targetKey/foreignKey to work on non-primaryKey
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true  // avoids having two accounts with same email address
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
  
    return User;

};