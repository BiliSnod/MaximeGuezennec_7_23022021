module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define("comment", {  // defining the model to create each comment
        message: {
            type: DataTypes.STRING(2040)
        }
    });

    return Comment;

};
