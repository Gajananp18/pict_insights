const express = require('express');
const router = express.Router();
const getStudentData = require("../controllers/studentDataController");

const { isStudentAuthenticated } = require("../middleware/studentAuth");
router.get("/home", isStudentAuthenticated , getStudentData);

module.exports = router;    