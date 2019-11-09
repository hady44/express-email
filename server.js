// require express and other modules
const express = require('express');
const mongoose = require("mongoose");
const helmet = require('helmet');
const passport = require('passport');
const app = express();

/**
 * Load Enviroment variables from .env file.
 */

require('dotenv')
    .config();

app.use(helmet());

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

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

app.use(passport.initialize());

require('./routes/routes')(app);
require('./services/config/passport')(passport);


app.use((err, req, res, next) => {
    res.status(500)
      .json({
        error: 'An error occurred with the server.',
      });
  });


//TODO: split app and server.
//TODO: switch to https.

/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});