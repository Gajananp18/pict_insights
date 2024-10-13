const express = require("express");
const multer = require("multer");

const studentProfileUpload = require("../controllers/studentProfileUpload");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, '../frontend/public/Data/studentProfileImage') // Uploads will be stored in the noticePosts/ directory
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  });

const upload = multer({ storage: storage });

router.post("/studentProfileUpload", upload.single("file"), studentProfileUpload);

module.exports = router;