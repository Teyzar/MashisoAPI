const e = require('express');
const express = require('express');
const router = express.Router();
require('dotenv').config();
var db = require('../config/database');

router.get('/get', (req,res) => {
    let sql = "SELECT * FROM category";
    db.query(sql, function (err, result, fields) { 
        if (err) {
            console.log(err);
            res.send(err);
        } else { 
            res.send(result);
        }
        
    }); 
  
})

router.post('/post', (req,res) => {
    let CategoryName = req.body.CategoryName;
    let sql = "INSERT into Category (CategoryName) values (?)";
    
    db.query(sql,[CategoryName], function (err, result, fields) { 
        if (err) throw err;
        if (result.length != 0) {
            res.json(result);
        }
    }); 
})

router.post('/api/order', (req,res) => {
    let MenuID = req.body.MenuID;
    let item = db.query(`(Select menu from Menu where menu_id=${MenuID})`);
    let Price = `(Select Price from Menu where menu_id=${MenuID})`;
    let quantity = req.body.quantity;
    
    let sql = "INSERT into order_list (MenuID,quantity) values (?,?)";



    // let sql = `INSERT into order_list (item) values (Select menu from Menu where menu_id=${MenuID})`;
    // let sql = `INSERT into order_list (Price) values (Select menu from Menu where Price=${Price})`;
    // let sql = "INSERT into order_list (quantity) values (?)";
    // let select = db.query(`select (menu, price) from Menu where menu_id=${MenuID}`);
    
    db.query(sql,[MenuID,quantity], function (err, result, fields) { 
        if (err) throw err;
        if (result.length != 0) {
            res.json(result);
        }
    });   
})



router.get('/get/category/:CategoryID', (req, res) => {

    let id = req.params.CategoryID;
    let sql = "SELECT * FROM category WHERE CategoryID=?";

    db.query(sql, id, function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})

router.get('/api/menu/:menu_id', (req,res)  => {
    let menu_id = req.params.menu_id;
    let sql = "SELECT * FROM menu WHERE menu_id=?";
    db.query(sql, menu_id, function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})
router.get('/api/menu', (req,res)  => {
    let sql = "SELECT * FROM menu";
    db.query(sql,function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})

module.exports = router;           