const email = require('./api/v1/email/email');

module.exports = (app) => {
    
    app.use('/api/email', email);

};