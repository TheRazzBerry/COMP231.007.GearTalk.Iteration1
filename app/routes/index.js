// Define Dependencies
const express = require('express');

//Define Router
const router = express.Router();

// Define Routes
router.get('/', (req, res, next) => { res.json({"message" : "Hello World!"}) });

// Export Module
module.exports = router;