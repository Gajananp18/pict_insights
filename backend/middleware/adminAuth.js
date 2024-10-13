const pool = require('../models/PictInsights');
const jwt = require('jsonwebtoken');

const isAdminAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ error: true, message: "Not Authenticated!" });
    }

    const token = authHeader.replace("Bearer ", "");
    console.log(token);
    const tokenQuery = `SELECT * FROM admin_token WHERE token = ?`;
    const tokenQueryParams = [token];
    const tokenQueryData = await pool.query(tokenQuery, tokenQueryParams);

    console.log(tokenQueryData);
    
    if (!tokenQueryData[0].length) {
      return res.status(401).json({ error: true, message: "Invalid Token!" });
    }

    const adminId = tokenQueryData[0][0].fk_admin;
    const adminQuery = `SELECT * FROM students WHERE id = ?`;
    const adminQueryParams = [adminId];
    const adminQueryData = await pool.query(adminQuery, adminQueryParams);

    req.student = adminQueryData[0][0];
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: "Internal Server Error!" });
  }
};

module.exports = { isAdminAuthenticated };