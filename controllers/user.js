let mongoose = require('mongoose');
let User = require('../models/user');

/**
 * Get a user from its ID
 * @param {String} userId A String or ObjectId Type object representing the user's ID
 * @param {function} callback - Called upon completion (err, user)
 */
exports.getById = function (userId, callback) {
    User.findById(userId, (err, res) => {
        callback(err, res);
    });
}

/**
 * Register a new user
 * @param {String} userId A String or ObjectId Type object representing the user's ID
 * @param {function} callback - Called upon completion (err, user)
 */
exports.register = function (req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const displayName = req.body.displayname;

    if (!email || !password || !displayName) {
        return res.status(422).send({ error: 'You must provide email, password, and display name' });
    }

    // See if a user with the given email exists
    User.findOne({ username: username }, function (err, existingUser) {
        if (err) { return next(err); }

        // If a username exists, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Username is in use' });
        }

        // If a user does not exist
        const user = new User({
            username: username,
            password: password,
            email: email,
            displayName: displayName
        });

        user.save(function (err) {
            if (err) { return next(err); }

            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) });
        });
    });
}