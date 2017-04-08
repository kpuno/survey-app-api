let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let User = require('../../models/user');

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











module.exports = router;