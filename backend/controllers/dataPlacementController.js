const pool = require('../models/PictInsights');

const getAllPlacement = async (req, res) => {
    const placementQuery = 'SELECT * FROM college_placement_blog';
    const placement = await pool.query(placementQuery);  
    res.json(placement[0]);
}

module.exports = getAllPlacement;