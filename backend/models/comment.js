module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define("comment", {  // defining the model to create each comment
        author: {
            type: DataTypes.STRING
        },
        message: {
            type: DataTypes.STRING
        }
    });

    return Comment;

};
