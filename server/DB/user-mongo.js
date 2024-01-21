const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    loggedIn: {
        type: Object,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);