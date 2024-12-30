const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const healthTips = require('../data/healthTipsData');

// Get all health tips
router.get('/', auth, async (req, res) => {
    try {
        res.json(healthTips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get tips by category
router.get('/category/:category', auth, async (req, res) => {
    try {
        const filteredTips = healthTips.filter(
            tip => tip.category === req.params.category
        );
        res.json(filteredTips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 