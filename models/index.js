const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI ||
    "mongodb://localhost:27017/personData", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

module.exports.persons = require("./person.js");
module.exports.emails = require("./email.js");