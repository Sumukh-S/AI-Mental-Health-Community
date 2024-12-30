const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ChatMessage = require('../models/ChatMessage');
const { generateResponse } = require('../services/gemini');

// Get chat history
router.get('/history', auth, async (req, res) => {
    try {
        const messages = await ChatMessage.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(50);
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Send message and get response
router.post('/message', auth, async (req, res) => {
    try {
        const { message } = req.body;

        // Get Gemini response
        const aiResponse = await generateResponse(message);

        // Save conversation
        const chatMessage = new ChatMessage({
            user: req.user.id,
            message: message,
            response: aiResponse
        });

        await chatMessage.save();
        res.json(chatMessage);
    } catch (err) {
        console.error('Chat error:', err);
        res.status(500).json({
            message: 'Error processing your message',
            error: err.message
        });
    }
});

module.exports = router; 