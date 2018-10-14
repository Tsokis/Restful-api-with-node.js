const express = require('express');
const app = express();
const morgan  = require('morgan')
var fs = require('fs');


app.use(morgan("combined"));

fs.readFile('emp.json', 'utf-8', (err, data) => {
    if (err) throw err;
    let employees = JSON.parse(data);
    console.log(employees);
});

app.get("/", (req,res) => {
    console.log("Test test test");
    res.send("Root test");
})


app.get("/emplist", (req,res) => {
    console.log(req);
    res.send("Employeelist is on!!")
    
})

app.get("/emplist/:id", (req,res) => {
    console.log("adsdsd" +req.params.id)
    res.end();
})


app.listen(3001, () => {
    console.log("We are on!!")
});



