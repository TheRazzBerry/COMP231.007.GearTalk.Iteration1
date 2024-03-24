const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const { requireSignIn } = require('../controllers/authController');

// Route to create a new group
router.post('/create', requireSignIn, groupController.createGroup);

// Route for a user to join a group
router.post('/:groupId/join', requireSignIn, groupController.joinGroup);

// Route to add a post to a group
router.post('/:groupId/posts', requireSignIn, groupController.addPostToGroup);

// Route to list all groups
router.get('/list', requireSignIn, groupController.listGroups);

module.exports = router;
