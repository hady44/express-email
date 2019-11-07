var router = require('express').Router();
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const db = require('../../../../models');

const Email = db.emails;

router.get('/send', (req, res) => {
    console.log('this works');
    
    res.render('email', {
        data:{
            success:false
        }
    });
})

router.post('/send', [
    check('email').isEmail()

],(req, res) => {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    email = new Email({
        recipient: req.body.email,
        subject: req.body.subject,
        body: req.body.emailBody,
        type: 'sent'
    })

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
        email.save().catch((err) => console.log(err));
        console.log("success");

        res.render('email', {
            data: {
                success: true
            }
        });

    }).catch((err) => console.log(err))
});

router.post('/', (req, res) => {
    email = new Email({
        recipient: req.body.From,
        subject: req.body.Subject,
        body: req.body.TextBody,
        type: 'received'
    })
    
    email.save();

    console.log(req.body);
    res.status(200).end();
});

router.use('/', (req, res) => {
    Email.find({type:'sent'}).exec(function (err, sentEmails) {
        Email.find({type:'received'}).exec(function (err, receivedEmails) {

            res.render('emails', {
                data: {
                    sentEmails,
                    receivedEmails
                }
            });

        })
    })
});

module.exports = router;
