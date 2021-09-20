const express = require('express');
const router = express.Router();
require('dotenv').config();
var db = require('../config/database');

//get category
router.get('/get', (req, res) => {
    let sql = "SELECT * FROM Category";
    db.query(sql, function (err, result, fields) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.send(result);
        }

    });
})
//getting cateogrys by id's
router.get('/get/category/:CategoryID', (req, res) => {

    let id = req.params.categoryID;
    let sql = "SELECT * FROM Category WHERE categoryID=?";

    db.query(sql, id, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})
//for inserting category
router.post('/post', (req, res) => {
    let categoryName = req.body.categoryName;
    let sql = "INSERT into Category (categoryName) values (?)";

    db.query(sql, [categoryName], function (err, result, fields) {
        if (err) throw err;
        if (result.length != 0) {
            res.json(result);
        }
    });
})
//insert orders
router.post('/api/order', function (req, res, err) {
    let tableID = req.body.tableID;
    let menuID = req.body.menuID;
    let quantity = req.body.quantity;

    let sql = "Insert into transaction_table (tableID, menuID, quantity) VALUES (?,?,?)";

    db.query(sql, [tableID, menuID, quantity], function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
})

//update orders
router.put('/api/order/:id', function (req, res, err) {
    let tableID = req.body.tableID;
    let menuID = req.body.menuID;
    let quantity = req.body.quantity;
    let id = req.params.id;

    let sql = "UPDATE transaction_table SET ? WHERE ?";

    let data = [{ tableID: tableID, menuID: menuID, quantity: quantity }, { id: id }]

    db.query(sql, data, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
})
//delete inserted order by id
router.delete('/api/order/:id', function (req, res, err) {
    let id = req.params.id;

    let sql = "DELETE FROM transaction_table WHERE ?";
    let checkdata = "SELECT COUNT(*) FROM transaction_table WHERE id = (SELECT id FROM transaction_table LIMIT 1)";
    let autoincrement = "ALTER TABLE transaction_table AUTO_INCREMENT=0";
    let increment = "UPDATE transaction_table set id = id-1 WHERE id>?";

    let data = [{ id: id }];

    let del = db.query(sql, data);
    let check = db.query(checkdata);

    if (del || check) {
        db.query(autoincrement);
        db.query(increment, id);
        res.send({ message: "delete was succesful" })
    }
})

//getting the list of orders
router.get('/api/orderlist', (req, res) => {
    let sql = "SELECT transaction_table.tableID, transaction_table.menuID, Menu.menu AS item, transaction_table.quantity, (transaction_table.quantity*Menu.price) AS price, transaction_table.transaction_date FROM transaction_table INNER JOIN Menu on transaction_table.menuID=Menu.menuID";
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json(result);

    });
})

//getting the list of orders by transcation id's
router.get('/api/orderlist/:tableID', (req, res) => {
    let tableID = req.params.tableID;
    let sql = "SELECT transaction_table.tableID, transaction_table.menuID, Menu.menu AS item, transaction_table.quantity, Menu.price, transaction_table.transaction_date FROM transaction_table INNER JOIN Menu on transaction_table.menuID=Menu.menuID AND transaction_table.tableID=(?)";
    db.query(sql, tableID, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
})
//geting the list of menus
router.get('/api/menu', (req, res) => {
    let sql = "SELECT * FROM Menu";
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})
//getting list of menu by id
router.get('/api/menu/:menuID', (req, res) => {
    let menuID = req.params.menuID;
    let sql = "SELECT * FROM menu WHERE menuID=?";
    db.query(sql, menuID, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    })
})

//sales per tableID
router.get('/api/sales/:tableID', (req,res) => {
    let tableID = req.params.tableID;
    let sql = `
    SELECT 
        transaction_table.tableID, transaction_table.menuID, Menu.price, sum(transaction_table.quantity) as quantity, (Menu.Price*(sum(transaction_table.quantity))) as 'Total each'
    FROM 
        transaction_table
    INNER JOIN
        Menu
    ON
        transaction_table.menuID=Menu.menuID
    WHERE
        transaction_table.tableID = ${tableID}
    GROUP by
        transaction_table.menuID, transaction_table.quantity`;

    db.query(sql,function (err, result, fields) { 
        if (err) throw err;
        res.json(result);
    });    
}) 

//getting all sales
router.get('/api/sales', (req,res) => {
    let tableID = req.params.tableID;
    let sql = `
    SELECT 
    id,tableID, transaction_table.menuID, Menu.price, transaction_table.quantity, (Menu.Price*(transaction_table.quantity)) as 'Total'
    FROM
        transaction_table
    INNER JOIN
        Menu
    ON 
        transaction_table.menuID=Menu.menuID`;

    db.query(sql,function (err, result, fields) { 
        if (err) throw err;
        res.json(result);
    });    
}) 


module.exports = router;