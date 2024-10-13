const express = require('express');
const router = express.Router();
const { register, login , logout} = require('../controllers/adminController');

const { isAdminAuthenticated } = require("../middleware/adminAuth");

router.post("/register", register)
router.post("/login", login)
router.post("/logout", isAdminAuthenticated, logout)

module.exports = router;