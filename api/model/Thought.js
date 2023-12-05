const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {type: String, required: true},
    description: {type: String, required: true},
    photos: {type: [String], required: false},
    tags: {type: [String], required: false},
})

const ThoughtModel = mongoose.model('Thought', ThoughtSchema);

module.exports = ThoughtModel;