const pool = require('../models/PictInsights');
require("dotenv").config();

const isStudentAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: true, message: "Not Authenticated!" });
    }
  try {
    const token = authHeader.replace("Bearer ", "");

    const tokenQuery = `SELECT * FROM student_token WHERE token = ?`;
    const tokenQueryParams = [token];
    const tokenQueryData = await pool.query(tokenQuery, tokenQueryParams);

    if (!tokenQueryData[0].length) {
      return res.status(401).json({ error: true, message: "Invalid Token!" });
    }

    const studentId = tokenQueryData[0][0].fk_student;
    const studentQuery = `SELECT * FROM students WHERE id = ?`;
    const studentQueryParams = [studentId];
    const studentQueryData = await pool.query(studentQuery, studentQueryParams);

    // console.log("Student with id is autheticate student -> ", studentQueryData[0][0].id);

    req.student = studentQueryData[0][0];
    req.token = token;

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

module.exports = { isStudentAuthenticated };