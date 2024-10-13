const express = require('express');
const router = express.Router();

const getAllPlacements = require("../controllers/dataPlacementController");
const { isStudentAuthenticated } = require("../middleware/studentAuth");

router.get("/getPlacement", isStudentAuthenticated , getAllPlacements);

module.exports = router;