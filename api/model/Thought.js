const mongoose = require('mongoose');

const ThoughtSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {type: String, required: true},
    type: {type: String, required: true},
    description: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    photos: {type: [String], required: false},
    duration: {type: Number, required: true},
})

const ThoughtModel = mongoose.model('Thought', ThoughtSchema);

module.exports = ThoughtModel;