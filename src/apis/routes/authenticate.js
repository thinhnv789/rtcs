var express = require('express');
var router = express.Router();
var authenticateController = require('./../controllers/Authenticate');

/* GET users listing. */
router.post('/login', authenticateController.postLogin);


module.exports = router;
