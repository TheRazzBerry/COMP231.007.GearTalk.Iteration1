const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/users/:username', searchController.searchUsersByUsername);
router.get('/groups/:groupName', searchController.searchGroupsByName);

module.exports = router;
