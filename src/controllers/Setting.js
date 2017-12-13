var Setting = require('./../models/Setting');
var Room = require('./../models/Room');

// Get all Categories
exports.getIndex = function (req, res) {
	Setting.find({}).exec(function (err, settings) {
		if (err) {
			console.log('err', err)
			return done(err);
		}
		
		res.render('setting/index', {
			title: 'Setting',
			current: ['Setting', 'index'],
			settings: settings
		});
	});
};

exports.getCreate = function (req, res) {
	Room.find({}, function(err, rooms) {
		res.render('setting/create', {
			title: 'Create New Setting',
			current: ['setting', 'create'],
			rooms: rooms
		});
	});
};

exports.postCreate = function (req, res) {
	/*
	* Validate create category
	*/ 
  req.checkBody('key', 'key is required').notEmpty();
  req.checkBody('value', 'value is required').notEmpty();

	var errors = req.getValidationResult().then(function(errors) {
		if (!errors.isEmpty()) {
			var errors = errors.mapped();
			res.render('setting/create', {
        title: 'Create New Setting',
        current: ['setting', 'create'],
				errors: errors,
				data: req.body
			});
			return;
		}

	/*
	* End validate
	*/
	var newSetting = new Setting();
	
    newSetting.key = req.body.key;
    newSetting.value = req.body.value;
    newSetting.description = req.body.description;
    // save the user
    newSetting.save(function (err) {
        if (err) {
            console.log('Error in Saving: ' + err);
            res.send({ "result": false });
        }
        res.redirect('/setting');
    });
	});
};