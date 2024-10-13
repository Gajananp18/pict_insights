const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/studentController');

const { isStudentAuthenticated } = require("../middleware/studentAuth");

router.post("/register", register)
router.post("/login", login)
router.post("/logout", isStudentAuthenticated, logout)

module.exports = router;