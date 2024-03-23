const Post = require('../models/postModel');
const Group = require('../models/groupModel');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, image, groupId } = req.body;
    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const post = new Post({
      content,
      image,
      createdBy: req.auth.id,
      group: groupId
    });

    const savedPost = await post.save();

    // Link the post to the group if groupId is provided
    if (groupId) {
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      group.posts.push(savedPost._id);
      await group.save();
    }

    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Toggle like
    const likeIndex = post.likes.indexOf(req.auth.id);
    if (likeIndex > -1) {
      post.likes.splice(likeIndex, 1); // Unlike the post
    } else {
      post.likes.push(req.auth.id); // Like the post
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error liking/unliking post', error });
  }
};

// Add a comment to a post
exports.commentOnPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { content } = req.body;
    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      content,
      createdBy: req.auth.id,
      created: new Date()
    };

    post.comments.push(comment);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error commenting on post', error });
  }
};
