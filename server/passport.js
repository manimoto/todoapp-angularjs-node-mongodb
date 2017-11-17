
//this file is not in used if you want to make your custom strategy
// you can write there like for signup nd etc

'use strict';
var Strategy = require('passport-local').Strategy;
var User = require('./models/user'),
mongoose = require('mongoose');
module.exports = function(passport){


passport.use(new Strategy(  

function(username, password, done) {
    User.findOne({ "email": username }, function (err, user) {
      console.log("User : " , user);
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }

));



}




/*  function(username, password, done) {
    // database dummy - find user and verify password
    mongoose.Promise = global.Promise;
    console.log(1 , username);
    User.findOne({"email":username}).exec().then(function(response){
      if(!response.email) {
        done(null, false);
      }
      else{
        console.log(22, response);

      if(username === response.email && password === password){
        done(null, {
          id: response._id,
          firstname: response.hash,
          lastname: 'name',
          email: 'devil@he.ll',
          verified: true
        });
      }}

    }, function (error){console.log("Error" , error)}); 
  }
*/




// var User = require('./models/user'),
//     LocalStrategy = require('passport-local');

// module.exports = function(passport){
//     passport.use(User.createStrategy());

//     passport.serializeUser(User.serializeUser());
//     passport.deserializeUser(User.deserializeUser() );

// }
//module.exports = passport; 
