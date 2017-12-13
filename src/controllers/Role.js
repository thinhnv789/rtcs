var Role = require('../models/Role');

// Get all Categories
exports.getIndex = function (req, res) {
	Role.find({}).populate('users').exec(function (err, roles) {
		if (err) {
			console.log('err', err)
			return done(err);
		}
		
		res.render('role/index', {
			title: 'Roles',
			current: ['role', 'index'],
			roles: roles
		});
	});
};

exports.getCreate = function (req, res) {
	res.render('role/create', {
    title: 'Create New Role',
    current: ['role', 'create'],
  });
};

exports.postCreate = function (req, res) {
	/*
	* Validate create category
	*/ 
  req.checkBody('name', 'Role name không được để trống').notEmpty();
  req.checkBody('ident', 'Ident không được để trống').notEmpty();

	var errors = req.getValidationResult().then(function(errors) {
		if (!errors.isEmpty()) {
			var errors = errors.mapped();
			res.render('role/create', {
        title: 'Create New Role',
        current: ['role', 'create'],
				errors: errors,
				data: req.body
			});
			return;
		}

	/*
	* End validate
	*/
	var newRole = new Role();
	
		newRole.name = req.body.name;
		newRole.ident = req.body.ident.toUpperCase();
		newRole.description = req.body.description;
		newRole.status = req.body.status;
		// save the user
		newRole.save(function (err) {
			if (err) {
				console.log('Error in Saving: ' + err);
				res.send({ "result": false });
			}
			res.redirect('/role');
		});
	});
};