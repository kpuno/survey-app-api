const User = require('../models/user');

exports.getUserInfo = function (req, res, next) {
	const email = req.body.email
	User.findOne({ email: email }, function (err, results) {
		if (err) { return next(err); }
		res.json(results);
	});
}

exports.editUserInfo = function (req, res, next) {
	const email = req.body.email;
	const displayName = req.body.displayName;
	const currentEmail = req.body.currentEmail;
	User.findOneAndUpdate(
		{ email: currentEmail },
		{ $set: { email: email, displayName: displayName } },
		{ upsert: true }
		, function (err, results) {
			if (err) { return next(err); }
			res.json(results);
		})
}

// passwords later

exports.changePassword = function (req, res, next) {
	const email = req.body.email;
	// const name = req.body.name;
	const password = req.body.password;
	const displayName = req.body.displayName;

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}

	User.findOneAndRemove({ email: email});

	// See if a user with the given email exists
	User.findOne({ email: email }, function (err, existingUser) {
		if (err) { return next(err); }

		// If a user with email does exist, return an error
		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		// If a user with email does NOT exist, create and save user record
		const user = new User({
			email: email,
			password: password,
			displayName: displayName
		});

		user.save(function (err) {
			if (err) { return next(err); }

			// Respond to request indicating the user was created
			res.json({ token: tokenForUser(user) });
		});
	});
}