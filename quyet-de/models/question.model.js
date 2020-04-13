// định nghĩa các document (record - bản ghi) trong collection (table) tên là "question"
const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionContent: {
        type: String,
        required: true,
    },
    like: {
        type: Number,
        default: 0,
    },
    dislike: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// 1 Model tương ứng với 1 Collection và cung cấp các hàm CRUD (Create, Read, Update, Delete)
const questionModel = mongoose.model('Question', QuestionSchema);

module.exports = questionModel; // to export in nodeJS