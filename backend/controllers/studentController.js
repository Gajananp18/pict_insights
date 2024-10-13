const pool = require('../models/PictInsights');
const bcrypt = require('bcrypt');
const getStudentToken = require('../utils/studentToken');

const register = async (req, res) => {
    const {first_name, last_name, email , password} = req.body;
    if(!email || !first_name || !last_name || !password){
        return res
            .status(400)
            .json({err: "Invalid request body"});
    }

    const isExistQuery = `SELECT * FROM students WHERE email = ?`;
    const isExistQueryParams = [email];
    const isExistQueryData = await pool.query(isExistQuery, isExistQueryParams);

    if(isExistQueryData[0].length){
        return res
            .status(403)
            .json({err: "Student alredy existttt....."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const studentQuery = `INSERT INTO students (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`;
    const studentQueryParams = [first_name, last_name, email, hashedPassword];
    const studentQueryData = await pool.query(studentQuery, studentQueryParams);
    
    const token = await getStudentToken(studentQueryData[0].insertId);
    const userToReturn = studentQueryData;
    delete userToReturn.password;
    return  res.status(200).json({
        error: false,
        message: "student Login Successfull.",
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

    const isExistQuery = `SELECT * FROM students WHERE email = ?`;
    const isExistQueryParams = [email];
    const isExistQueryData = await pool.query(isExistQuery, isExistQueryParams);
    
    if(!isExistQueryData[0].length){
        return res
            .status(403)
            .json({err: "Student dosent existttt....."});
    }

    const auth = await bcrypt.compare(
        password,
        isExistQueryData[0][0].password
    );

    if (auth) {
        const token = await getStudentToken(isExistQueryData[0][0].id);
        const student = isExistQueryData;
        delete student.password;
        console.log(token);
        res.status(200).json({
            error: false,
            message: "Student Login Successful.",
            data: {
                token,
                student,
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
        const studeId = req.student.id;
        
        const query = `DELETE from student_token WHERE fk_student = ?`;
        const queryParams = [studeId];
        const queryData = await pool.query(query, queryParams);

        // console.log(queryData);
        res.status(200).json({ error: false, message: "Logout Successfull." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal server error!" });
    }
};



module.exports = { register, login, logout };
