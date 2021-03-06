var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');
var User = new mongoose.Schema({
    email: {
        type: String,
        required: '{Path} is required!'
    },
    admin:{
        type:Boolean
    }
});


// User.methods.verifyPassword = function (password) {
//        return false;
// };

// Passport-Local-Mongoose will add a username, 
// hash and salt field to store the username, 
// the hashed password and the salt value

// configure to use email for username field

User.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', User);