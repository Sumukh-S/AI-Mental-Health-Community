const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mood: {
        type: String,
        required: true,
        enum: ['Happy', 'Sad', 'Anxious', 'Calm', 'Angry', 'Excited', 'Tired', 'Stressed']
    },
    intensity: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    activities: [{
        type: String
    }],
    thoughts: String,
    sleepHours: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('MoodEntry', moodEntrySchema); 