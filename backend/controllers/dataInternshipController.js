const pool = require('../models/PictInsights');

const getAllInternship = async (req, res) => {
    const internshipQuery = 'SELECT * FROM college_internship_blog';
    const internship = await pool.query(internshipQuery);  
    res.json(internship[0]);
}

module.exports = getAllInternship;