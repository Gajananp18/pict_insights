const pool = require('../models/PictInsights');

const uploadStudentProfile = async (req, res) =>{
    try{
        const authHeader = req.headers.authorization;
        const token = authHeader.replace("Bearer ", "");

        const tokenQuery = `SELECT * FROM student_token WHERE token = ?`;
        const tokenQueryParams = [token];
        const tokenQueryData = await pool.query(tokenQuery, tokenQueryParams);

        const studentID = tokenQueryData[0][0].fk_student;

        const file = req.file;

        const destination = file.destination;
        const newDestination = destination.replace("../frontend/public", "..");

        const path = newDestination + '/' + file.filename;
        console.log("Full path of the file -> ", path);

        const imageUrlQuery = `UPDATE students SET profile_picture_url = ? WHERE id = ?`;
        const imageUrlQueryParams = [path , studentID];
        const imageUrlQueryData = await pool.query(imageUrlQuery, imageUrlQueryParams);

    }
    catch{

    }
}

module.exports = uploadStudentProfile;