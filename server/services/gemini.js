const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResponse = async (message) => {
    try {
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `As a mental health assistant, provide supportive and empathetic responses while maintaining appropriate boundaries. User message: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API error:', error);
        return "I apologize, but I'm having trouble processing your request at the moment. Please try again later.";
    }
};

module.exports = {
    generateResponse
}; 