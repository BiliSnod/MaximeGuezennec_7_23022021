module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define("role", {  // defining the model to create roles
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        level: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
  
    return Role;
    
};