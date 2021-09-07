module.exports = (sequelize, DataTypes) => {

    const Note = sequelize.define("note", {  // defining the model to create each note
        title: {
            type: DataTypes.STRING
        },
        content: {
            type: DataTypes.STRING
        }/*,
        mediaUrl: {
            type: DataTypes.STRING
        },
        mediaType: {
            type: DataTypes.STRING
        }*/
    });

    return Note;

};
