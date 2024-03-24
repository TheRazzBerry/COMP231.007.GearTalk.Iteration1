// Environment Variables
require('dotenv').config();
const DB_URI = process.env.DB_URI;

// Database Setup
const mongoose = require('mongoose');

module.exports = function() {
    //Get MongoDB URL
    mongoose.connect(DB_URI);
    // Test Connection
    let mongodb = mongoose.connection;
    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', () => {console.log("Connected to MongoDB")});
    //Return Connection
    return mongodb;
}