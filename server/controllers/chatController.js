const ChatMessage = require('../models/ChatMessage');
const openai = require('../services/gemini'); // You'll need to set this up

exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user.id;

        // Get response from AI service
        const aiResponse = await openai.generateResponse(message);

        // Save the conversation
        const chatMessage = new ChatMessage({
            user: userId,
            message: message,
            response: aiResponse
        });

        await chatMessage.save();

        res.json({
            success: true,
            data: chatMessage
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing chat message'
        });
    }
};

exports.getChatHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await ChatMessage.find({ user: userId })
            .sort({ createdAt: -1 })
            .limit(50);

        res.json({
            success: true,
            data: history
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching chat history'
        });
    }
}; 