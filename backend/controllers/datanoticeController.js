const pool = require('../models/PictInsights');

const getAllNotices = async (req, res) => {
    const noticeQuery = 'SELECT * FROM college_notice';
    const notices = await pool.query(noticeQuery);  
    res.json(notices[0]);
}

module.exports = getAllNotices;