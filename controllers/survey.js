let mongoose = require('mongoose');
let User = require('../models/user');
let Survey = require('../models/survey');
let winston = require('winston');

exports.getAll = (userId, callback) => {
    console.log("Getting all courses");
    let userObj = null;
    let surveyIdList = null;
    let surveyObjList = [];

    // Fetch the user from database. Ensures we are working with latest version.
    User.findById(userId, (err, user) => {
        if (err || !user) {
            let msg = "User not found for id: " + userId + "\n" + (err || "Not Found");
            winston.error(msg);
            return callback(msg);
        }
        else {
            winston.debug("Getting courses for user id: " + user._id);
            surveyIdList = user.surveys;

            Survey.find({ _id: { $in: user.surveys } }, (err, surveys) => {
                callback(err, surveys);
            });
        }
    });
}


/** Adds the survey ID to the list of survey the User owns. */
function addSurveyToUser(user, survey, callback) {
    winston.debug("Adding survey to user profile..");
    user.surveys.push(survey._id);
    User.update({ _id: user._id }, { surveys: user.surveys }, (err) => {
        if (err) {
            let msg = "Error updating user survey list: " + err;
            winston.error(msg);
            callback(new Error(msg));
            return;
        }
        else {
            winston.debug("Successfully added survey to User profile.");
            callback();
            return;
        }
    });
}

/** Adds the Survey object to the surveys collection. Calls *addSurveyToUser*. */
function addSurveyToCollection(user, survey, callback) {
    winston.debug("Adding survey to collection..");
    survey.owner = user._id;
    Survey.create(survey, (err, survey) => {
        if (err || !survey) {
            let msg = "Error inserting survey: " + err;
            winston.error(msg);
            callback(new Error(msg));
            return;
        }
        else {
            winston.debug('Successfully added survey to collection.');
            callback(err, course);
            return;
        }
    });
};

/**
 * Add a survey document to the surveys collection.
 * Also adds a reference to the survey ID in the owner's User document.
 * @param {String} user A user object containing the user _id
 * @param {object} survey A survey object to insert in the surveys collection
 */
exports.add = (userId, survey, callback) => {
    // Get latest version of User object
    User.findById(userId, (err, user) => {
        if (err || !user) {
            callback(err);
            return;
        }
        else {
            // If found, add new survey to collection
            addCourseToCollection(user, survey, (err, surveyDoc) => {
                if (err) {
                    callback(err);
                    return;
                }
                else {
                    // If successful, add survey ID to user profile
                    addCourseToUser(user, surveyDoc, (err, res) => {
                        callback(err, surveyDoc);
                        return;
                    });
                }
            });
        }
    });
}