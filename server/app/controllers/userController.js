let userModel = require('../models/userModel');

// Create New User
module.exports.create = async function (req, res, next) {
    try {
        let newUser = new userModel(req.body);
        let user = await userModel.create(newUser);
        return res.status(200).json(user);
    } catch (error) { next(error); }
}

// List All Users
module.exports.list = async function (req, res, next) {
    try {
        let userList = await userModel.find({});
        return res.status(200).json(userList);
    } catch (error) { next(error); }
}

// Find User By ID
module.exports.find = async function (req, res, next) {
    try {
        let userId = req.params.id;
        req.user = await userModel.findOne({ _id: userId }, '-hashedPass -salt');
        next();
    } catch (error) { next(error); }
}

// Read User Method
exports.read = function (req, res, next) {
    res.json(req.user);
}

// Update User Information By ID
module.exports.update = async function (req, res, next) {
    try {
        let userId = req.params.id;
        let updatedUser = userModel(req.body);
        updatedUser._id = userId;
        // Update User By ID
        let result = await userModel.findByIdAndUpdate(userId, updatedUser);
        if (!result) throw res.status(500).json({ message: 'Update Failed!' });
        if (result.updatedCount < 1) throw res.status(404).json({ message: 'User Not Found!' });
        res.status(200).json({ message: 'Successfully Updated User With ID: ' + userId });
    } catch (error) { next(error); }
}

//Delete User By ID
module.exports.delete = async function (req, res, next) {
    try {
        let userId = req.params.id;
        let result = await userModel.deleteOne({ _id: userId });
        if (!result) throw res.status(404).json({ message: 'Error! Nothing Was Deleted!' });
        res.status(200).json({ message: 'Deleted The User With The ID: ' + userId });
    } catch (error) { next(error); }
}