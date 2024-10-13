const jwt = require('jsonwebtoken');
require("dotenv").config();
const pool = require('../models/PictInsights');

const getStudentToken = async (StudentId) => {
    try {
        const token = jwt.sign({ id: StudentId }, process.env.TOKEN_SECRET);
        const timestamp = new Date();
        const tokenQuery = `INSERT INTO student_token (token, fk_student, created_at) VALUES (?, ?, ?)`;
        const tokenQueryParams = [token, StudentId, timestamp];
        await pool.query(tokenQuery, tokenQueryParams);

        return token;
      } catch (err) {
        throw new Error(err);
      }
}

module.exports = getStudentToken;