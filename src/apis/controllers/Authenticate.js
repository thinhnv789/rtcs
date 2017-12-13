const bluebird = require('bluebird');
const crypto = bluebird.promisifyAll(require('crypto'));
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const User = require('./../../models/User');
const Role = require('./../../models/Role');

/**
 * Passport
 */
const passport = require('./../../middleware/passport');

/**
 * POST /login
 * Sign in using email and password.
 */
exports.postLogin = (req, res, next) => {
    req.checkBody('email', 'Email is invalid').isEmail();
    req.checkBody('password', 'Password cannot be blank').notEmpty();
    req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });
  
    req.getValidationResult().then(function(errors) {
      if (!errors.isEmpty()) {
        return res.json({
            success: false,
            code: 1,
            message: 'Email or password is empty'
        })
      } else {
        User.findOne({
          email: req.body.email
        }, (err, user) => {
          if (err) throw err;
          if (!user) {
            return res.json({ success: false, code: 2, message: 'Authentication failed. User not found.' });
          } else {
            // check if password matches
            user.comparePassword(req.body.password, (err, isMatch) => {
              if (err) { 
                return done(err); 
              }
              if (isMatch) {
                /**
                 * Using json web token gen token for client
                 */
                var token = passport.jwtCreateToken(user.id);
                // res.cookie('rtcs_chat_token', token, { httpOnly: false});
                return res.json({
                    success: true,
                    token: token
                });
              } else {
                return res.json({ success: false, code: 3, message: 'Authentication failed. Wrong email or password.' });
              }
            })
          }
        })
      }
    })
};