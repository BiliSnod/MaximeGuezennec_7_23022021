module.exports = (sequelize, Sequelize) => {
    const Note = sequelize.define("note", {  // defining the model to create each note
      title: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
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