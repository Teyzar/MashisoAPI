const express = require('express');
const route = require('./routes/router');
const mysql = require('mysql');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/', route); 

const port = 3000; 

app.listen(port, () => {
    console.log(`Server ${port}`); 
})

