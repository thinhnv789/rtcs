var express = require('express');
var router = express.Router();

/**
 * API keys and Passport configuration.
 */
const passport = require('../middleware/passport');

/* GET home page. */
router.get('/', passport.isAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', passport.isAuthenticated, function(req, res, next) {
  res.render('admin');
});

module.exports = router;
