var express = require('express');
var router = express.Router();
var RoomController = require('../controllers/Room');

/* get all categories. */
router.get('/', RoomController.getIndex);
router.get('/create', RoomController.getCreate);
router.post('/create', RoomController.postCreate);

module.exports = router;
