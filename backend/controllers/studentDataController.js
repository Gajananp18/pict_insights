const pool = require("../models/PictInsights");
require("dotenv").config();

const getStudentData = (req, res) => {
  try {
    const studentToReturn = req.student;
    delete studentToReturn.password;
    return  res.status(200).json({
        error: false,
        message: "Returning Student Data",
        data: studentToReturn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

module.exports = getStudentData;

