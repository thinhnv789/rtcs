var express = require('express');
var router = express.Router();
var SettingController = require('../controllers/Setting');

/* get all categories. */
router.get('/', SettingController.getIndex);
router.get('/create', SettingController.getCreate);
router.post('/create', SettingController.postCreate);

module.exports = router;
