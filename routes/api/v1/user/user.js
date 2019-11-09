var router = require('express').Router();
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const db = require('../../../../models');
const jwt = require('jsonwebtoken');
const passport = require('passport')

const User = db.persons;

require('dotenv').config();
const secret = process.env.SECRET || 'the default secret';

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user){
            let error = 'Email Address Exists in Database.';
            return res.status(400).json(error);
        } else {
            const newUser = new User({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender

            });

            newUser.save()
            .then((user) => {
                console.log(user);
                
                res.json(user)
            })
        }
    })
})

router.post('/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;   
    User.findOne({ email, _deleted: false })
         .then(user => {
            if (!user) {
               errors.email = "No Account Found";
               return res.status(404).json({error: "No Account Found"});
           }
           user.checkPassword(password)
                  .then(isMatch => {
                      console.log(isMatch);
                      
                     if (isMatch) {
                       const payload = {
                         id: user._id,
                         name: user.userName
                      };
                      jwt.sign(payload, secret, { expiresIn: 36000 },
                              (err, token) => {
                                if (err) res.status(500)
                                .json({ error: "Error signing token",
                                       raw: err }); 
                                 res.json({ 
                                 success: true,
                                 token: `Bearer ${token}` });
                      });      
                } else {
                    // console.log('noooooooo');
                    
                    // errors.password = "Password is incorrect";                        
                    // res.send({error: "Password is incorrect!"});
                    res.status(400).json({msg: "password is incorrect"});
        }
      });
    });
  });

  router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({msg: "only auth users can see this"});
    
  });
  module.exports = router;