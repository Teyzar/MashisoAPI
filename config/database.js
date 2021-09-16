
const mysql = require('mysql');
const qb = require('node-querybuilder');

const settings = {
    host: 'localhost',
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD, 
    database : process.env.DB_DATABASE 
}

const pool = new qb(settings, 'mysql', 'pool');



pool.get_connection(qb, function(err) {
    if (err) console.log('failed to connect');
    if (!err) console.log('Connected to mysql Database');
})

module.exports = qb;
  