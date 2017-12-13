const jwt = require('jsonwebtoken');
const User = require('./../models/User');

const publicUrl = '/user/login';
/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.cookies['rtcs_token'];
    
        /** Verify token => userId */
        this.jwtVerifyToken(token, user => {
            if (user) {
                req.session.user = user;
                res.locals.user = user;
                next();
            } else {
                return res.redirect(publicUrl);
            }
        });
    }
};

exports.jwtCreateToken = (data) => {
    console.log('data', data);
    let token = jwt.sign(data, process.env.JWT_SECRET);

    return token;
}

exports.jwtVerifyToken = (token, cb) => {
    // verifies secret and checks exp
    console.log('token', token);
    jwt.verify(token, process.env.JWT_SECRET, function(err, userId) {  
        console.log('user_id', userId);
        if (err) {
          return cb(null);   
        } else {
          // if everything is good, save to request for use in other routes
            User.findOne({
                _id: userId
            }, (err, user) => {
                if (err) {
                    return cb(null);   
                } else {
                    return cb(user); 
                }
            })
        }
    });
}

