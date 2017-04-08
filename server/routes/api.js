let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let User = require('../../models/user');

let userController = require('../../controllers/user');

let surveyController = require('../../controllers/survey');

let authController = require('../../controllers/authentication');

router.get('/', function (req, res, next) {
    res.end("surveyApp API");
});

/**###################
 *       USER
 ####################*/

/**
 * GET /api/user
 * Fetches logged in user's profile.
 * Returns =>
 * Success: {userobj}
 * Failure: {"err": "errormsg"}
 */
router.get('/user', (req, res, next) => {
    if (req.user) {
        userController.getById(req.user._id, (err, user) => {
            if (err || !user) {
                let msg = "Error fetching user";
                res.json({ err: msg });
            } else {
                res.json(user);
            }
        });
    } else {
        let msg = "Not logged in.";
        res.json({ err: msg });
    }
});

/** 
 * POST /api/user
 */
router.post('/user/signup', authController.signup);



/**
 * GET /api/user/surveys
 * Fetches logged in user's created surveys.
 * Returns =>
 * Success: {surveys}
 * Failure: {"err": "errormsg"}
 */
router.get('/user/surveys', (req, res, next) => {
    surveyController.getAll(req.user._id, (err, surveys) => {
        if (err || !surveys) {
            let msg = "Error fetching surveys";
            return res.json({ err: msg });
        } else {
            return res.json(surveys);
        }
    });
});





module.exports = router;