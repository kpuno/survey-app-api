let mongoose = require('mongoose');

let URI = "mongodb://localhost/scheduleapp";

// Set up database
// DB Setup
mongoose.connect(process.env.URI || 'mongodb://user:12345@ds153730.mlab.com:53730/survey-app');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log("Connected to MongoDB instance.");
});