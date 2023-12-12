const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    background: {type: [String], required: false},
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;