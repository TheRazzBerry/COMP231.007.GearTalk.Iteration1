const express = require('express');
const router = express.Router();
const Contact = require("../models/contactModel");

router.post('/', async (req, res) => {
    try {
        // Extract data from request body
        const { name, email, message } = req.body;
        
        // Validate input fields
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new contact instance
        const newContact = new Contact({ name, email, message });

        // Save the contact to the database
        await newContact.save();

        // Send success response
        return res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
