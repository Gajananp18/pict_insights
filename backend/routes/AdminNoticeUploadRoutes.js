const express = require("express");
const router = express.Router();
const multer = require("multer");

const uploadNotice = require("../controllers/adminNoticeUploadControllers");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, '../frontend/public/Data/noticePosts')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  });

const upload = multer({ storage: storage });

router.post("/uploadNotice", upload.single("file"), uploadNotice);

module.exports = router;