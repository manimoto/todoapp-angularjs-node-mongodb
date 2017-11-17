var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    cors = require('cors'),
    app = express(),
    env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    envConfig = require('./server/env')[env];

mongoose.Promise = global.Promise;
mongoose.connect(envConfig.db).then(() =>  console.log('Mongo connection succesful'))
.catch((err) => console.error(err));
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:') );

//passport configuration
//require('./server/passport')(passport);

//express configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

//for angular/frontend static content
app.use(express.static('/index.html'));
app.use('/app',express.static(__dirname + '/app'));
app.use('/node_modules',express.static(__dirname + '/node_modules'));

//Routes
require('./server/routes')(app, passport);

//Start server
app.listen(envConfig.port, function(){
    console.log('listenning on Port' + envConfig.port )
})



