const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../profile_pic_uploads"));
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now();
      cb(null, uniquePrefix + '-' + file.originalname);
    }
});

function fileFilter (req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
        // To accept the file pass `true`, like so:
        cb(null, true)
    } else {
        // To reject this file pass `false`, like so:
        cb(null, false)
    }
  
    // You can always pass an error if something goes wrong:
    // cb(new Error('I don\'t have a clue!'))
}

const opts = {
    storage: storage,
    fileFilter: fileFilter
}

const upload = multer(opts);

module.exports = upload;