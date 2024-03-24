// Define Module Dependencies
const mongoose = require('mongoose');

// Create Schema
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    }
});

// Define Model and Export
const Contact = new mongoose.model('Contact', contactSchema);
module.exports = Contact;