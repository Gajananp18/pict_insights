const mysql = require('mysql2');
require("dotenv").config();

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

if(pool){
    console.log("Database Connection Successful");
}

module.exports = pool;
