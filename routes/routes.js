const email = require('./api/v1/email/email');
const user = require('./api/v1/user/user');

module.exports = (app) => {
    
    app.use('/api/email', email);
    app.use('/api/user', user);
};