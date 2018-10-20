const express = require('express');
const app = express();
const morgan  = require('morgan')
var fs = require('fs');
const mysql = require('mysql');

app.use(morgan("combined"));

// Root route
app.get("/", (req,res) => {
    res.send("Root test");
})

// fetching all database users
app.get("/dbUsers", (req, res) => {
    // Creating mySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees'
    });
    connection.connect((error) => {
        if (!!error) {
            console.log('Error');
        } else {
            console.log('Connected');
        }

    });
    //fetching from database    
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


// Database with id Route
app.get("/dbUsers/:id",(req,res) => {    
    // Creating mySQL database
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees'
    });
    connection.connect((error) => {
        if (!!error) {
            console.log('Error');
        } else {
            console.log('Connected');
        }

    });
    //fetching from database
    const userId = req.params.id;
    const queryString = 'SELECT * FROM information WHERE ID = ?'
    connection.query(queryString,[userId], (err,rows,fields) => {
        if(err) {
            console.log('Query error'+ err);
            res.sendStatus(500);
            res.end();
        } 
        console.log('Success');
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
        })
        res.json(users);
              
    });       
})


// Fetching local json on route localhost:3001/emplist
app.get("/emplist", (req,res) => {
    fs.readFile('emp.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let employees = JSON.parse(data);
        res.send(employees)
    });    
})

// test
app.get("/emplist/:id", (req,res) => {
    //test
    console.log('emplist id'+req.params.id)
    res.end();
})


// Run server
app.listen(3001, () => {
    console.log("We are on!!")
});



