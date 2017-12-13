var Room = require('./../models/Room');

// Get all Categories
exports.getIndex = function (req, res) {
	Room.find({}).exec(function (err, rooms) {
		if (err) {
			console.log('err', err)
			return done(err);
		}
		
		res.render('room/index', {
			title: 'Room',
			current: ['room', 'index'],
			rooms: rooms
		});
	});
};

exports.getCreate = function (req, res) {
	res.render('room/create', {
    title: 'Create New Room',
    current: ['room', 'create'],
  });
};

exports.postCreate = function (req, res) {
	/*
	* Validate create category
	*/ 
  req.checkBody('roomName', 'Tên phòng không được để trống').notEmpty();

	var errors = req.getValidationResult().then(function(errors) {
		if (!errors.isEmpty()) {
			var errors = errors.mapped();
			res.render('room/create', {
        title: 'Create New Room',
        current: ['room', 'create'],
				errors: errors,
				data: req.body
			});
			return;
		}

	/*
	* End validate
	*/
	var newRoom = new Room();
	
    newRoom.roomName = req.body.roomName;
    newRoom.description = req.body.description;
    newRoom.status = req.body.status;
    // save the user
    newRoom.save(function (err) {
        if (err) {
            console.log('Error in Saving: ' + err);
            res.send({ "result": false });
        }
        res.redirect('/room');
    });
	});
};