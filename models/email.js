const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

const emailSchema = new Schema({
    recipient: String,
    subject: String,
    body: String,
    type: ['sent', 'received']
});

const emailModel = mongoose.model('email', emailSchema);

module.exports = emailModel;