const multer = require("multer");
const path = require("path");

const userStorage = multer.diskStorage({
  destination: (req, file, cb) => {
// console.log(req);
console.log(file);

    let destination = path.resolve("files/images");
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.split('.')[0] + Date.now() + path.extname(file.originalname));
  },
});

const userUpload = multer({ storage: userStorage }).single("file");

module.exports = { userUpload };