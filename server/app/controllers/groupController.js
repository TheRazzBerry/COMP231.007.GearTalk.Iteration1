const Group = require('../models/groupModel');
const Post = require('../models/postModel');

// Create a new group
exports.createGroup = async (req, res, next) => {
  try {
    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { name, description } = req.body;
    const owner = req.auth.id;

    const group = new Group({
      name,
      description,
      owner,
      members: [owner]
    });

    await group.save();
    res.status(201).json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Error creating group', error });
  }
};

// Join a group
exports.joinGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const userId = req.auth._id;

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    if (!group.members.includes(userId)) {
      group.members.push(userId);
      await group.save();
    }

    res.status(200).json({ message: 'Successfully joined the group' });
  } catch (error) {
    res.status(500).json({ message: 'Error joining group', error });
  }
};

// Add a post to a group
exports.addPostToGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const { content } = req.body;

    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    const post = new Post({
      content,
      createdBy: req.auth.id,
      group: groupId
    });

    await post.save();
    group.posts.push(post._id);
    await group.save();

    res.status(201).json({ message: 'Post added to group', post });
  } catch (error) {
    console.error('Error adding post to group:', error);
    res.status(500).json({ message: 'Error adding post to group', error });
  }
};

// List all groups
exports.listGroups = async (req, res) => {
  try {
    const groups = await Group.find().populate('owner', 'name').populate('members', 'name');
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving groups', error });
  }
};
