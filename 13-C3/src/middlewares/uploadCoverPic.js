const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../coverPics"));
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now();
      cb(null, uniquePrefix + '-' + file.fieldname);
    }
});

function fileFilter (req, file, cb) {

    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    // To accept the file pass `true`, like so:
    if (file.mimetype == image/png || file.mimetype == image/jpeg) {
        cb(null, true);
    } else {
        cb(null, false)
    }
    
  
    // To reject this file pass `false`, like so:
    
  
    
  
    // You can always pass an error if something goes wrong:
    cb(new Error('I don\'t have a clue!'))
  
}

const opts = {
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 1024 * 1024 * 5}
}

const upload = multer(opts);
module.exports = upload;