module.exports = (sequelize, DataTypes) => {

    const Note = sequelize.define("note", {  // defining the model to create each note
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.STRING
        }/*,
        author: {
            type: Sequelize.STRING
        },
        mediaUrl: {
            type: Sequelize.STRING
        }*/
    });

    return Note;

};
