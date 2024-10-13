const express = require('express');
const router = express.Router();

const getAllNotices = require("../controllers/datanoticeController");
const { isStudentAuthenticated } = require("../middleware/studentAuth");

router.get("/getNotice", isStudentAuthenticated , getAllNotices);

module.exports = router;    