// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

const {Strategy, ExtractJwt} = require('passport-jwt');


const User = require('../../models/person');

require('dotenv').config();

const secret = process.env.SECRET || 'the default secret';

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret
};

/**
 * JWT Client Options.
 */
// const JWTOptionsClient = {
//     jwtFromRequest: ExtractJWT.fromAuthHeader(),
//     secretOrKey: process.env.JWT_KEY_CLIENT,
//     passReqToCallback: true,
//   };

  module.exports = passport => {
    passport.use(
        new Strategy(opts, (payload, done) => {
            console.log(payload);
            console.log('nooooooooooooooo');
            
             User.findById(payload.id)
                 .then(user => {
                     if(user){
                       return done(null, {
                           id: user.id,
                           name: user.name,
                           email: user.email,
                       });
                     }
                     return done(null, false);
                  }).catch(err => console.error(err));
              })
           )
     };

