// require express and other modules
const express = require('express');
const app = express();
var router = express.Router();
// Express Body Parser
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));

//set ejs as view engine
app.set('view engine', 'ejs');

/************
 * DATABASE *
 ************/

const db = require('./models');

const Email = db.emails;


require('./routes/routes')(app);


/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});