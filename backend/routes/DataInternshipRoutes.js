const express = require('express');
const router = express.Router();

const { isStudentAuthenticated } = require("../middleware/studentAuth");
const getAllInternship = require('../controllers/dataInternshipController');

router.get("/getInternship", isStudentAuthenticated , getAllInternship);

module.exports = router;    