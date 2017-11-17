'use strict';

const passport = require('passport');  
const Strategy = require('passport-local');
const jwt = require('jsonwebtoken');
const express = require('express');  
const http = require('http'); // you really want https here!

const app = express();

passport.use(new Strategy(  
  function(username, password, done) {
    // database dummy - find user and verify password
    if(username == 'devils' && password == '666'){
      done(null, {
        id: 666,
        firstname: 'devils',
        lastname: 'name',
        email: 'devil@he.ll',
        verified: true
      });
    }
    else {
      done(null, false);
    }
  }
));

module.exports = passport;  


app.use(passport.initialize());  
app.post('/auth', passport.authenticate(  
  'local', {
    session: false
  }), serialize, generateToken, respond);

http.createServer(app).listen(1337);  

function serialize(req, res, next) {  
    db.updateOrCreate(req.user, function(err, user){
      if(err) {return next(err);}
      // we store the updated information in req.user again
      req.user = {
        id: user.id
      };
      next();
    });
  }
  
  const db = {  
    updateOrCreate: function(user, cb){
      // db dummy, we just cb the user
      cb(null, user);
    }
  };

  function generateToken(req, res, next) {  
    req.token = jwt.sign({
      id: req.user.id,
    }, 'server secret', {
      expiresInMinutes: 120
    });
    next();
  }


  function respond(req, res) {  
    res.status(200).json({
      user: req.user,
      token: req.token
    });
  }