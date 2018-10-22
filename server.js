const express = require('express');
const app = express();
const morgan  = require('morgan');
const bodyParser = require('body-parser');
// Routes
const router = require('./routes/employees');
const testroute = require('./routes/testroute');
const empStatic = require('./routes/empStatic');
//<------------------------------------------->

//serving static files [The --public-- folder]
app.use(express.static('./public'));

// morgan middleware
app.use(morgan("short"));

// body-parser middleware
app.use(bodyParser.urlencoded({extended: false}))

// fetching from routes
app.use(router);
app.use(testroute);
app.use(empStatic);


// Run server
app.listen(3001, () => {
    console.log("We are on!!")
});



