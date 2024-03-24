const User = require('../models/userModel');
const Group = require('../models/groupModel');

exports.searchUsersByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ name: username });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

exports.searchGroupsByName = async (req, res) => {
    try {
        const groupName = req.params.groupName;
        const groups = await Group.find({ 
            $or: [
                { name: { $regex: groupName, $options: 'i' } },
                { description: { $regex: groupName, $options: 'i' } }
            ]
        });

        if (groups.length === 0) {
            return res.status(404).json({ success: false, message: "No matching groups found" });
        }

        res.json({ success: true, groups });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};
