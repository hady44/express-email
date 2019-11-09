const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female'],
    },
    birthdate: {
        type: Date,
    },
    status: {
        type: String,
        default: 'unconfirmed',
        enums: ['unconfirmed', 'confirmed', 'banned'],
    },
    passwordResetTokenDate: {
        type: Date,
        default: Date.now,
    },
    confirmationTokenDate: {
        type: Date,
        default: Date.now,
    },
    passwordChangeDate: {
        type: Date,
        default: Date.now,
    },
    _deleted: {
        type: Boolean,
        default: false,
    }
});

personSchema.pre('save', function preSave(done) {
    let user = this;
    
    if (!this.isModified('password')) {
        done();
    } else {

        console.log(this.password);
        

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(""+user.password, salt, function(err, hash) {
                // Store hash in your password DB.
                if (err) {
                    console.log(err);
                    
                    done(err);
                }
                user.password = hash;
                // console.log(this.password);
                
                done();
            });
            
        });
        
    }
});

personSchema.methods.checkPassword = function checkPassword(guess) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(guess, this.password, (err, matching) => {
            if (err) {
                
                return reject(err);
            }
            console.log(this.password);
            
            return resolve(matching);
        });
    });
};


const personModel = mongoose.model('person', personSchema);

module.exports = personModel;