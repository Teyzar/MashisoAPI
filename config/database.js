
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database : process.env.DB_DATABASE 
})
db.connect((err) => {
    if (err) console.log('failed to connect');
    if (!err) console.log('Connected to mysql Database');
})

module.exports = db;
 