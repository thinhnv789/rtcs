var express = require('express');
var router = express.Router();
var RoleController = require('../controllers/Role');

/* get all categories. */
router.get('/', RoleController.getIndex);
router.get('/create', RoleController.getCreate);
router.post('/create', RoleController.postCreate);

module.exports = router;
