const pool = require('../models/PictInsights');

const uploadPlacementPost = async (req, res) =>{
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader.replace("Bearer ", "");

        const tokenQuery = `SELECT * FROM admin_token WHERE token = ?`;
        const tokenQueryParams = [token];
        const tokenQueryData = await pool.query(tokenQuery, tokenQueryParams);

        const adminID = tokenQueryData[0][0].fk_admin;
        
        const file = req.file;
        const destination = file.destination;
        const newDestination = destination.replace("../frontend/public", "..");
        const path = newDestination + '/' + file.filename;

        const {title, description} = req.body;

        const noticeQuery = `INSERT INTO college_placement_blog (title, content, placement_admin, image_url) VALUES (?, ?, ?, ?)`;
        const noticeQueryParams = [title, description, adminID, path];
        const noticeQueryData = await pool.query(noticeQuery, noticeQueryParams);
    }
    catch{

    }
}

module.exports = uploadPlacementPost;