const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MoodEntry = require('../models/MoodEntry');

// Submit mood entry
router.post('/', auth, async (req, res) => {
    try {
        const moodEntry = new MoodEntry({
            user: req.user.id,
            ...req.body
        });

        await moodEntry.save();

        // Generate personalized recommendations based on mood and activities
        const recommendations = generateRecommendations(req.body.mood, req.body.intensity);

        res.status(201).json({
            moodEntry,
            recommendations
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get user's mood history
router.get('/history', auth, async (req, res) => {
    try {
        const moodHistory = await MoodEntry.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(moodHistory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Helper function to generate recommendations
function generateRecommendations(mood, intensity) {
    const recommendations = {
        Happy: [
            'Maintain this positive energy by engaging in activities you enjoy',
            'Share your happiness with friends or family',
            'Journal about what made you happy today',
            'Consider trying something new while in this positive state'
        ],
        Sad: [
            'Take a gentle walk in nature',
            'Reach out to a friend or family member',
            'Practice self-care activities',
            'Listen to uplifting music',
            'Consider talking to a mental health professional'
        ],
        Anxious: [
            'Try deep breathing exercises',
            'Practice mindfulness meditation',
            'Write down your worries and challenge them',
            'Reduce caffeine intake',
            'Consider progressive muscle relaxation'
        ],
        Angry: [
            'Take time to cool down',
            'Practice deep breathing',
            'Exercise to release tension',
            'Write down your thoughts',
            'Consider the source of your anger'
        ],
        Stressed: [
            'Take regular breaks',
            'Practice relaxation techniques',
            'Prioritize your tasks',
            'Get some fresh air',
            'Consider delegation or asking for help'
        ]
    };

    return recommendations[mood] || [
        'Practice self-care',
        'Maintain a regular sleep schedule',
        'Stay hydrated and eat well',
        'Connect with others'
    ];
}

module.exports = router; 