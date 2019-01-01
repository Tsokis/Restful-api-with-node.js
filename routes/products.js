"use strict";

const express = require('express');
const mysql = require('mysql');
const productsController = express.Router();
//connection pool
const pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'products'
});

function getConnection() {
    return pool;
}


// ---------------------------POST METHODS-----------------------------------------
productsController.post('/product_form', (req, res) => {
  
    // reading the name attributes of the html form
    const title = req.body.createTitle;
    const desc = req.body.createDescription;
    const cost = req.body.createCost;
    const queryString = "INSERT INTO motherboards (name,description,cost) VALUES (?,?,?)";
    
    getConnection().query(queryString, [title, desc, cost], (error, results, fields) => {
        if (error) {
            console.log("Failed to insert a new user" + error);
            res.sendStatus(500);
            return
        }
        res.end();
    });
});


// ---------------------------GET METHODS------------------------------------------
// Fetching all products from product database(motherboards table)
productsController.get("/fetchProducts", (req, res) => {
    // Creating mySQL database
    const connection = getConnection();
    // Fetching from database[mySQL]  
    const queryString = 'SELECT * FROM motherboards'
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log('Query error' + err);
            res.sendStatus(500);
            res.end();
        }
        console.log('Data were fetched!');
        res.json(rows);
    });
});

module.exports = productsController;