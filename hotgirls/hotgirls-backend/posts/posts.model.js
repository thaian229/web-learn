const mongoose = require('mongoose');

// createdAt: date
// content: string
// views: number, default = 0
// imageUrl: string
// author: User

const PostsSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: new Date(),
    },
    content: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const PostsModel = mongoose.model('Post', PostsSchema);

module.exports = PostsModel;