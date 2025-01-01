import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import '../styles/chatbot.css';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        const storedMessages = localStorage.getItem('chatMessages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        } else {
            fetchChatHistory();
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('chatMessages', JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const fetchChatHistory = async () => {
        try {
            const response = await api.get('/chat/history');
            const fetchedMessages = response.data.reverse();
            setMessages(fetchedMessages);
            localStorage.setItem('chatMessages', JSON.stringify(fetchedMessages));
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input;
        setInput('');
        setLoading(true);

        const newMessages = [...messages, { message: userMessage, type: 'user' }];
        setMessages(newMessages);
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        setTyping(true);

        try {
            const response = await api.post('/chat/message',
                { message: userMessage },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            setTyping(false);
            const updatedMessages = [...newMessages, {
                message: response.data.response,
                type: 'bot',
                timestamp: new Date()
            }];
            setMessages(updatedMessages);
            localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
        } catch (error) {
            console.error('Error sending message:', error);
            setTyping(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container p-4">
            <div className="chat-window">
                <div className="welcome-message">
                    <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        AI Chat Assistant
                    </h2>
                    <p>How can I help you today?</p>
                </div>

                <div className="messages-container">
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className={`message-bubble ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}>
                                    <p>{msg.message}</p>
                                    {msg.timestamp && (
                                        <div className="message-timestamp">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {typing && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="typing-indicator"
                        >
                            <div className="typing-dot" />
                            <div className="typing-dot" />
                            <div className="typing-dot" />
                        </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="chat-input-container">
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="chat-input"
                            disabled={loading}
                        />
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="send-button"
                        >
                            {loading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                                />
                            ) : (
                                'Send'
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat; 