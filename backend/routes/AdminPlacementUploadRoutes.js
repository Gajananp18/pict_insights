const express = require("express");
const router = express.Router();
const multer = require("multer");

const uploadPlacement = require("../controllers/adminPlacementUploadContoller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, '../frontend/public/Data/placementPosts')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  });

const upload = multer({ storage: storage });

router.post("/uploadPlacement", upload.single("file"), uploadPlacement);

module.exports = router;