'use strict';
// MYSQL EMPLOYEES
// importing express
const express = require('express');
const mysql = require('mysql');
//using express Router
//test route
const router = express.Router();

//connection pool
const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees'
});
function getConnection() {
    return pool;
}


// ---------------------------POST METHODS-----------------------------------------
router.post('/emp_form', (req, res) => {
    console.log('post test');
    console.log("the name you enter is: " + req.body.createName);
    // reading the name attributes of the html form
    let id = req.body.createId;
    const name = req.body.createName;
    const age = req.body.createAge;
    const position = req.body.createPosition;
    const queryString = "INSERT INTO information (NAME,AGE,PROFESSION,ID) VALUES (?,?,?,?)"
    getConnection().query(queryString, [name, age, position, id], (error, results, fields) => {
        if (error) {
            console.log("Failed to insert a new user" + error);
            res.sendStatus(500);
            return
        }
        console.log("Inserted a new employee with id:", results.insertId);
        res.end();
    });
});


// ---------------------------GET METHODS------------------------------------------
// Root route
router.get("/", (req, res) => {
    res.send("Root test");
})

// Fetching all database users
router.get("/dbUsers", (req, res) => {
    // Creating mySQL database
    const connection = getConnection();
        
    // Fetching from database[mySQL] 
    const queryString = 'SELECT * FROM information'
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('Query error' + err);
            res.sendStatus(500);
            res.end();
        }
        console.log('Success');
        res.json(rows);
    });
})


// Fetching from the database with id Route
router.get("/dbUsers/:id", (req, res) => {
    // Creating mySQL database
    const connection = getConnection();
    
    //fetching from database
    const userId = req.params.id;
    const queryString = 'SELECT * FROM information WHERE ID = ?'
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
            console.log('Query error' + err);
            res.sendStatus(500);
            res.end();
        } else {
            console.log('Success');

        }       
        // Formatting my rows prettier.IN mySql i have them with Capital letters
        const users = rows.map((row) => {
            return {
                id: row.ID,
                name: row.NAME,
                age: row.AGE,
                profession: row.PROFESSION,
                Payment: row.PAYMENT,
                YearPayment: row.YEARPAYMENT
            }
        });
        res.json(users);
    });
})

router.get('/delete_emp/:id', (req, res) => {
    const deleteConnection = getConnection();
    const deleteId = req.params.id;
    const deleteQueryString = 'DELETE FROM information WHERE ID = ?'
    deleteConnection.query(deleteQueryString, [deleteId], (err, rows, fields) => {
        if (err) {
            console.log('Query error' + err);
            res.sendStatus(500);
            res.end();
        } else {
            console.log('Deleted');
        }
        //mysql query response
        //res.json(rows);

        res.json({
            target: 'succesfull remove'
        });
    })
});


module.exports = router;