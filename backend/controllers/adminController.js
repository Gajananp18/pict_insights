const pool = require('../models/PictInsights');
const bcrypt = require('bcrypt');
const getAdminToken = require('../utils/adminToken');

const register = async (req, res) => {
    const {email , password} = req.body;
    if(!email || !password){
        return res
            .status(400)
            .json({err: "Invalid request body"});
    }

    const isExistQuery = `SELECT * FROM admins WHERE email = ?`;
    const isExistQueryParams = [email];
    const isExistQueryData = await pool.query(isExistQuery, isExistQueryParams);

    if(isExistQueryData[0].length){
        return res
            .status(403)
            .json({err: "Admin alredy existttt....."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminQuery = `INSERT INTO admins (email, password) VALUES (?, ?)`;
    const adminQueryParams = [email, hashedPassword];
    const adminQueryData = await pool.query(adminQuery, adminQueryParams);
    
    const token = await getAdminToken(adminQueryData[0].insertId);
    const userToReturn = adminQueryData;
    delete userToReturn.password;
    return  res.status(200).json({
        error: false,
        message: "Admin Login Successfull.",
        data: {
            token,
            userToReturn,
        },
    });
};

const login = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ error: true, message: "All fields are required!" });
    }

    const isExistQuery = `SELECT * FROM admins WHERE email = ?`;
    const isExistQueryParams = [email];
    const isExistQueryData = await pool.query(isExistQuery, isExistQueryParams);
    
    if(!isExistQueryData[0].length){
        return res
            .status(403)
            .json({err: "Admin dosent existttt....."});
    }

    const auth = await bcrypt.compare(
        password,
        isExistQueryData[0][0].password
    );

    if (auth) {
        const token = await getAdminToken(isExistQueryData[0][0].id);
        const admin = isExistQueryData;
        
        res.status(200).json({
            error: false,
            message: "Admin Login Successful.",
            data: {
                token,
                admin,
            },
        });
    }
    else {
        res.status(400).json({
            error: true,
            message: "Password Not Correct!",
        });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.token;
        const adminId = req.admin.id;

        const query = `DELETE from admin_token WHERE adminId = ?`;
        const queryParams = [adminId];
        const queryData = await pool.query(query, queryParams);

        res.status(200).json({ error: false, message: "Logout Successfull." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal server error!" });
    }
};



module.exports = { register, login, logout };
