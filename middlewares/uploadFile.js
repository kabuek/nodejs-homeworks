const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../tmp"),
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const splitedFileName = file.originalname.split(".");
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + splitedFileName.pop());
  },
});

const upload = multer({ storage });

module.exports = upload;
