var express = require('express');
var router = express.Router();
var chatController = require('./../controllers/Chat');

/* GET users listing. */
router.get('/customers', chatController.getCustomers);


module.exports = router;
