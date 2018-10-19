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



// Database Route
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

    connection.query('SELECT * FROM information', (err,rows,fields) => {
        if(!!err) {
            console.log('Query error');
        } else {
            console.log('Success');
            res.json(rows);
        }        
    });   
    //connection.end();
    
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



