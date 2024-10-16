const mongoose = require('mongoose');

const sportsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    courts: {
        type: Number,
        required: true,
        default: 1 // Fixed the casing here (default should be lowercase)
    }
});

const Sports = mongoose.model("Sports", sportsSchema); // Class names should be capitalized

module.exports = Sports;
