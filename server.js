// require express and other modules
const express = require('express');
const axios = require('axios');
const app = express();
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

const Person = db.persons;
/*
 * JSON API Endpoints
 */
app.get('/', (req, res) => {
    res.json({
        msg: 'Hello Friends',
    })
});

app.get('/api/persons', (req, res) => {

    console.log('hiissi');


    Person.find({}).exec(function (err, persons) {
        // console.log(personss);
        // for(x in personss){
        //     console.log(personss[x]);

        // }
        res.render('index', {
            data: {
                persons
            }
        });
    })

});

app.post('/api/persons', (req, res) => {
    // person = req.body
    // console.log(person);
    // res.json({
    //     msg: "got you"
    // })

    person = new Person({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    })
    person.save()
        .then(res.json({
            msg: "saved successfully"
        }))
        .catch((err) => console.log(err));
});

app.get('/api/email', (req, res) => {
    res.render('email');
});

app.post('/api/email', (req, res) => {
    console.log(req.body);

    axios.post("https://api.postmarkapp.com/email", {
        "From": "hady.mohamed@tum.de",
        "To": req.body.email,
        "Subject": req.body.subject,
        "TextBody": req.body.emailBody,
    }, {
        headers: {
            "X-Postmark-Server-Token": "119af47c-7c17-472c-a7fd-603f3531487d"
        }
    }).then(() => {
        console.log("success");
        
        res.render('email.ejs')
    }).catch((err) => console.log(err))
});

app.post('/api/inbound', (req, res) => {
    console.log(req.body);
    res.status(200).end();
});

/**********
 * SERVER *
 **********/

// listen on the port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server is up and running on http://localhost:3000/');
});