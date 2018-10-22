const express = require('express');
const app = express();
const morgan  = require('morgan')
const fs = require('fs');
const mysql = require('mysql');
const bodyParser = require('body-parser');


//serving static files [The --public-- folder]
app.use(express.static('./public'));

// morgan middleware
app.use(morgan("short"));

// body-parser middleware
app.use(bodyParser.urlencoded({extended: false}))

// public method for connection to our database 
function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employees'
    });
}

// ---------------------------POST METHODS-----------------------------------------
app.post('/emp_form',(req, res) => {
    console.log('post test');    
    console.log("the name you enter is: " +req.body.createName);
    // reading the name attributes of the html form
    let id = req.body.createId;
    const name = req.body.createName;
    const age = req.body.createAge;
    const position = req.body.createPosition;
    const queryString= "INSERT INTO information (NAME,AGE,PROFESSION,ID) VALUES (?,?,?,?)"
    getConnection().query(queryString,[name,age,position,id],(error,results,fields) => {
        if (error) {
            console.log("Failed to insert a new user" + error);
            res.sendStatus(500);
            return
        }

        
        console.log("Inserted a new employee with id:", results.insertId);
        res.end();
    })      

})



// ---------------------------GET METHODS------------------------------------------
// Root route
app.get("/", (req,res) => {
    res.send("Root test");
})

// Fetching all database users
app.get("/dbUsers", (req, res) => {
    // Creating mySQL database
    const connection = getConnection();
    connection.connect((error) => {
        if (!!error) {
            console.log('Error');
        } else {
            console.log('Connected');
        }

    });
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
app.get("/dbUsers/:id",(req,res) => {    
    // Creating mySQL database
    const connection = getConnection();
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



