const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { requireSignIn } = require('../controllers/authController');

router.post('/create', requireSignIn, postController.createPost);
router.put('/:postId/like', requireSignIn, postController.likePost);
router.post('/:postId/comment', requireSignIn, postController.commentOnPost);

module.exports = router;
