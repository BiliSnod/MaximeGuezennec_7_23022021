module.exports = (sequelize, DataTypes) => {

    const Note = sequelize.define("note", {  // defining the model to create each note
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING(2040),
            allowNull: false
        },
        mediaUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    
    return Note;

};
