var express = require('express');
var router = express.Router();
var userController = require('../controllers/User');

/* GET users listing. */
router.get('/', userController.getIndex);

router.get('/create', userController.getCreate);
router.post('/create', userController.postCreate);

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/logout', userController.logout)

module.exports = router;
