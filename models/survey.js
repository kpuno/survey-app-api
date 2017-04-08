/**
 * Model for a survey document
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let surveySchema = Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Survey name is required.'
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: 'Owner ID must be specified.'
    }
},
    {
        collection: "surveys"
    });

module.exports = mongoose.model('surveys', surveySchema);
