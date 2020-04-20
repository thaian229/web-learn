// email => required, unique
// password => required
// fullName => required
// createdAt

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

// 1 Model tương ứng với 1 Collection và cung cấp các hàm CRUD (Create, Read, Update, Delete)
const UsersModel = mongoose.model('User', UserSchema);

module.exports = UsersModel;