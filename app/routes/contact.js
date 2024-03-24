// Define Module Dependencies
const express = require('express');

// Define Router
const router = express.Router();

// Define Controllers
let contactController = require('../controllers/contactController');

// Define Basic Routes
router.get('/', (req, res, next) => { res.json({ message: 'contact.js root' }); });
router.post('/', contactController.create);

// Export Module
module.exports = router;