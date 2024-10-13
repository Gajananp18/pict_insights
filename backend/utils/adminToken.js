const jwt = require('jsonwebtoken');
require("dotenv").config();
const pool = require('../models/PictInsights');

const getAdminToken = async (AdminId) => {
    try {
        const token = jwt.sign({ id: AdminId }, process.env.TOKEN_SECRET);

        const timestamp = new Date();
        const tokenQuery = `INSERT INTO admin_token (token, fk_admin, created_at) VALUES (?, ?, ?)`;
        const tokenQueryParams = [token, AdminId, timestamp];
        await pool.query(tokenQuery, tokenQueryParams);

        return token;
      } catch (err) {
        throw new Error(err);
      }
}

module.exports = getAdminToken;