const express = require("express");
const router = express.Router();
const multer = require("multer");

const uploadInternship = require("../controllers/adminInternshipUploadController");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, '../frontend/public/Data/internshipPosts')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  });

const upload = multer({ storage: storage });

router.post("/uploadInternship", upload.single("file"), uploadInternship);

module.exports = router;