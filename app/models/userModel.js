// Define Module Dependencies
const mongoose = require('mongoose');
const crypto = require('crypto');

// Create Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Invalid email!'],
        trim: true,
        unique: true,
        required: true
    },
    hashedPass: {
        type: String
    },
    salt: {
        type: String
    },
    groups: [{
        groupId: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],
    following: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],
    followers: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],
    likes: [{
        postId: {
            type: mongoose.Schema.Types.ObjectId
        }
    }],
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
}, { collection: 'users' });

// Set 'salt' and 'hashedPass'
userSchema.virtual('password').set(function (password) {
    if (password.length < 8) throw new error('Password must be at least 8 characters long!');
    //Generate 'salt' Using Crypto
    this.salt = Buffer.from(crypto.randomBytes(16).toString('base64'), 'base64');
    this.hashedPass = this.hashPassword(password);
});

// Return 'hashedPass' Using Password Input
userSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('base64');
}

// Compare Store 'hashedPass' and Hashed Input Password
userSchema.methods.authenticate = function (password) {
    return this.hashedPass === this.hashPassword(password);
}

// Ensure Virtual Fields are Serialized
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hashedPass;
        delete ret.salt;
    }
});

// Define Model and Export
const user = mongoose.model('User', userSchema);
module.exports = user;