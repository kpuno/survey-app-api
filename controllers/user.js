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
