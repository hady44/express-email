const mongoose = require('mongoose'),
 Schema = mongoose.Schema;

const personSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String
});

const personModel = mongoose.model('person', personSchema);

module.exports = personModel;