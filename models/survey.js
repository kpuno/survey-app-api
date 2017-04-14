const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
	title: {
		type: String
	},
	survey: {
		type: Object
	},
	email: {
		type: String
	},
	exipryDate: {
    type: String
  }
})

// Create the model class
const ModelClass = mongoose.model('survey', surveySchema);

// Export the model
module.exports = ModelClass;