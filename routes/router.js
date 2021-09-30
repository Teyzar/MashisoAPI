const { query } = require('express');
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

    let insertSalesTable = "INSERT INTO Sales (tableID, menuID, quantity) SELECT tableID, menuID, quantity FROM transaction_table  WHERE transactionDate = CURRENT_TIMESTAMP";

    let query = db.query(sql, [tableID, menuID, quantity], function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });

    if (query) {
        db.query(insertSalesTable);
    }
})


//update orders
router.put('/api/order/:id', function (req, res, err) {
    let tableID = req.body.tableID;
    let menuID = req.body.menuID;
    let quantity = req.body.quantity;
    let id = req.params.id;

    let sql = "UPDATE transaction_table SET ? WHERE ?";

    let SalesTable = "UPDATE sales SET ? WHERE ?";

    let data = [{ quantity: quantity }, { id: id }]

    let query = db.query(sql, data, function (err, result, fields) {
        if (err) throw err;
    });

    if (query) {
        db.query(SalesTable, data, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    }
})
//delete inserted order by id when customer wants to cancel order.
router.delete('/api/cancelorder/:id', function (req, res, err) {
    let id = req.params.id;

    let tb = "DELETE FROM transaction_table WHERE ?";
    let sales = "DELETE FROM Sales WHERE ?";

    let checkdata_tb = "SELECT COUNT(*) FROM transaction_table WHERE id = (SELECT id FROM transaction_table LIMIT 1)";
    let autoincrement_tb = "ALTER TABLE transaction_table AUTO_INCREMENT=0";
    let increment_tb = "UPDATE transaction_table set id = id-1 WHERE id>?";

    let checkdata_s = "SELECT COUNT(*) FROM Sales WHERE id = (SELECT id FROM Sales LIMIT 1)";
    let autoincrement_s = "ALTER TABLE Sales AUTO_INCREMENT=0";
    let increment_s = "UPDATE Sales set id = id-1 WHERE id>?";

    let data = [{ id: id }];

    let del_tb = db.query(tb, data);
    let del_S = db.query(sales, data);

    let checktb = db.query(checkdata_tb);
    let checkS = db.query(checkdata_s);

    if (del_tb || checktb && del_S || checkS) {
        db.query(autoincrement_tb);
        db.query(autoincrement_s);
        db.query(increment_tb, id);
        db.query(increment_s, id);
        res.send({ message: "delete was succesful" })
    }
})

//to clear the order by tableID per tableID Transaction
router.delete('/api/tableID/:tableID', function (req, res)  {

    let tableID = req.params.tableID;

    
    let id = "SELECT COUNT(*) FROM transaction_table WHERE id = (SELECT id FROM transaction_table LIMIT 0)";
    let sql = `DELETE FROM transaction_table WHERE tableID=${tableID}`;
    let countTableID = `SELECT count(*) as num FROM transaction_table WHERE tableID = ${tableID}`;
    let autoincrement = 'ALTER TABLE transaction_table AUTO_INCREMENT=1'

  db.query(countTableID, function(err, result, fields) {
        if (err) throw err;
        let count = result[0]['num'];
        
        db.query(`select id from transaction_table where tableID = ${tableID}`, function (err,result) {
            let update = result[0]['id'];

        if (db.query(sql) || db.query(id)) {
            db.query(autoincrement, function(err, result) {
                if (err) throw err;
                res.json(result); 
            })    
            db.query(`UPDATE transaction_table set id = id-${count} where id > ${update-1}`);
            db.query('SELECT MAX(id) as id from transaction_table', function(err, result) {
                if (err) throw err;
                let max = result[0]['id'];
                db.query(`ALTER TABLE transaction_table AUTO_INCREMENT = ${max}`);
            });
            }
        }) 
    });
})

// to delete all list in trasaction_table
router.delete('/api/order', function (req, res)  {
    let sql = "DELETE FROM transaction_table";
    let id = "SELECT COUNT(*) FROM transaction_table WHERE id = (SELECT id FROM transaction_table LIMIT 0)";
    let autoincrement = 'ALTER TABLE transaction_table AUTO_INCREMENT=1'

    let del = db.query(sql);

    let check = db.query(id);

    if (del || check) {
        db.query(autoincrement, function(err, result) {
            if (err) throw err;
            res.json(result);
        }) 
    }
})

//to delete all list in Sales table
router.delete('/api/sales', function (req, res)  {
    let sql = "DELETE FROM Sales";
    let id = "SELECT COUNT(*) FROM Sales WHERE id = (SELECT id FROM Sales LIMIT 0)";
    let autoincrement = 'ALTER TABLE Sales AUTO_INCREMENT=1'

    let del = db.query(sql);

    let check = db.query(id);

    if (del || check) {
        db.query(autoincrement, function(err, result) {
            if (err) throw err;
            res.json(result);
        })
    }
})

//getting the list of orders
router.get('/api/orderlist', (req, res) => {
    let sql = `SELECT id, tb.tableID, tb.menuID, Menu.menu AS item, tb.quantity, Menu.price, tb.transactionDate FROM transaction_table tb INNER JOIN Menu on tb.menuID=Menu.menuID`;
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });
})

//getting the list of orders by transcation id's
router.get('/api/orderlist/:tableID', (req, res) => {
    let tableID = req.params.tableID;
    let sql = `
    SELECT 
        id,transaction_table.tableID, transaction_table.menuID, Menu.menu AS item, transaction_table.quantity, Menu.price, transaction_table.transactionDate 
    FROM 
        transaction_table 
    INNER JOIN 
        Menu 
    ON 
        transaction_table.menuID=Menu.menuID  
    AND 
        transaction_table.tableID=(?)`;
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
        id,transaction_table.tableID, transaction_table.menuID, Menu.price, sum(transaction_table.quantity) as quantity, (Menu.Price*(sum(transaction_table.quantity))) as 'Total each'
    FROM 
        transaction_table
    INNER JOIN
        Menu
    ON
        transaction_table.menuID=Menu.menuID
    WHERE
        transaction_table.tableID = ${tableID}
    GROUP by
        transaction_table.menuID, transaction_table.quantity, id`;

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

//get all total day sales
router.get('/api/daysales', (req,res) => {
    let tableID = req.params.tableID;
    let sql = `
    SELECT 
    id,tableID, s.menuID, Menu.price, s.quantity, (Menu.Price*(s.quantity)) as 'Total'
    FROM
        Sales s
    INNER JOIN
        Menu
    ON 
        s.menuID=Menu.menuID`;
    db.query(sql,function (err, result, fields) { 
        if (err) throw err;
        res.json(result);
    });    
}) 

//get total sales by date, input date format should be  year-month-day and also you can type just by year
router.get('/api/daysales/:transactionDate', (req,res) => {
    let transactionDate = req.params.transactionDate;
    let sql = `
    SELECT 
        id,s.tableID, s.menuID, Menu.price, sum(s.quantity) as quantity, (Menu.Price*(sum(s.quantity))) as 'Total each', s.transactionDate
    FROM 
        Sales s
    INNER JOIN
        Menu
    ON
        s.menuID=Menu.menuID
    WHERE
        s.transactionDate LIKE '%${transactionDate}%'
    GROUP by
        s.menuID, s.quantity, s.tableID, s.transactionDate, id`;

    db.query(sql,function (err, result, fields) { 
        if (err) throw err;
        res.json(result);
    });    
})


module.exports = router;