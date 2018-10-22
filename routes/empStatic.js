// JSON STATIC FILE
const express = require('express');
const empStatic = express.Router();
const fs = require('fs');
// Fetching local json on route localhost:3001/emplist
empStatic.get("/emplist", (req, res) => {
    fs.readFile('emp.json', 'utf-8', (err, data) => {
        if (err) throw err;
        let employees = JSON.parse(data);
        res.send(employees)
    });
});

// test
empStatic.get("/emplist/:id", (req, res) => {
    //test
    console.log('emplist id' + req.params.id)
    res.end();
});

module.exports = empStatic;
