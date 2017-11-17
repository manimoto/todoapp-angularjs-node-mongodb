var express = require('express'),
    path = require('path'),
    User = require('./models/user'),
    rootPath = path.normalize(__dirname + '/../'),
    apiRouter = express.Router();
    //router = express.Router();
    
//for token based auth
const expressJwt = require('express-jwt');

module.exports = function (app, passport) {
   
    app.use(express.json());
    app.use(express.urlencoded());
    
    //home Routes
    

    app.post('/register', function (req, res) {
        //passport-local-mongoose method to register
        User.register(new User({
            email: req.body.email,
            admin: req.body.admin || false
        }), req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                res.status(201).json("User Already Exist");
            }
            else if (user) {
                res.status(201).json("Succesfully Created");
            }


        })
    });

    //route to test authentication can remove in production or before production
    const authenticate = expressJwt({ secret: 'server secret' });
    app.post('/me', authenticate, function (req, res) {
        console.log(req.user.firstname);
        res.status(200).json(req.user);
    
    });
    //test end
    
    //route for token generation
    //create stretegy call is to initialize the local strategy for password check
    passport.use(User.createStrategy());
    app.post('/login', passport.authenticate(
        'local', {
            session: false
        }), require('./serialize'), require('./generatetoken'), require('./respond'));
    //end token generation

    app.use('/api', expressJwt({ secret: 'server secret' }), apiRouter);
    
    require('./api/ninjas')(apiRouter);
    
    app.get('/login', function (req, res) {
        res.sendFile(rootPath + '/index.html')
    });

    app.get('/*', function (req, res) {
        res.sendFile(rootPath + '/index.html')
    });
    
    app.use(function (req, res) {
        res.status(404);
        res.render('404');
        return;
    })

};

