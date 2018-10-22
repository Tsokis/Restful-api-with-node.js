// TEST ROUTE
// importing express
const express = require('express');
//using express Router
//test route
const test = express.Router();
test.get("/testroute", (req, res) => {
    console.log('test route is online feel free to mess up');
    res.end();
});

//exporting testroute.js
module.exports = test;