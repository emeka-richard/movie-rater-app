const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    actors: {
        type: Array,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema);