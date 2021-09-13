const multer = require("multer");  // importing "multer" package to manage uploaded files

const MIME_TYPES = {  // object to match a MIME type with an extension
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif"
};

const storage = multer.diskStorage({  // using "diskStorage" method of "multer" to decide how the files are saved
    destination: (req, file, callback) => {  // function to save medias in the "medias" folder
        callback(null, "medias");
    },
    filename: (req, file, callback) => {  // function to rename the file
        const name = file.originalname.split(" ").join("_");  // keeping original filename but replacing spaces by underscores
        const extension = MIME_TYPES[file.mimetype];  // handling the extension name format
        callback(null, name + Date.now() + "." + extension);  // adding a timestamp
    }
});
  

module.exports = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {  // function using fileFilter option of Multer to only accept specific filetypes
        if (file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error ("Les fichiers acceptées sont de format JPG, JPEG, PNG ou GIF"));
        }
    }
}).single("media");  // exporting using "multer" on the "storage" object, with "single" method used to specify it is a single media file
