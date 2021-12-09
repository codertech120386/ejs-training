const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted
    if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" ) {
        // To accept the file pass `true`, like so:
        cb(null, true)
    } else {
        // To reject this file pass `false`, like so:
        cb(null, false)
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        filesize: 10
    }
})