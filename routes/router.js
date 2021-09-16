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

router.post('/api/order', function (req,res, err)  {
    let MenuID = req.body.MenuID;
    let quantity = req.body.quantity;
    
    let sql = "INSERT INTO order_list (MenuID,quantity) VALUES (?,?)";

    // var menuidlist = getmenuid();
 
    return console.log(menuid);
    // let i = 0; 
    // for (i = 0; i < menuidJson.length; i++) {
    //     if (MenuID === menuidJson) {
    //         db.query(sql,[MenuID,quantity], function (err, result, fields) { 
    //             if (err) throw err;
    //             res.json(result);
    //         });  
    //     }else{  
    //         // res.send({msg: "error" });
    //         return res.json("err");
    //     }
    // }
}) 

router.get('/api/orderlist', (req,res) => {

    let sql = "SELECT Order_List.OrderId, Order_List.MenuID, Menu.menu as Item, Order_List.quantity, Menu.price from Order_List Inner JOIN Menu on Order_List.MenuID=Menu.menu_id";
    db.query(sql, function (err, result, fields) { 
        if (err) throw err;
        res.json(result);
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
    let sql = "SELECT * FROM Menu";
    db.query(sql,function(err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})

module.exports = router;           