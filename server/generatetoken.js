
const jwt = require('jsonwebtoken');
module.exports =  function generateToken(req, res, next) {
    req.token = jwt.sign({
        id: req.user.id,
    }, 'server secret', {
            expiresIn: 60 * 60 * 24
        });
    next();
}
