import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/health.css';

const Health = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All Tips', color: 'from-purple-500 to-blue-500' },
        { id: 'Mental', label: 'Mental Health', color: 'from-blue-500 to-teal-500' },
        { id: 'Physical', label: 'Physical Health', color: 'from-teal-500 to-green-500' },
        { id: 'Emotional', label: 'Emotional Health', color: 'from-green-500 to-yellow-500' },
        { id: 'Social', label: 'Social Health', color: 'from-yellow-500 to-orange-500' }
    ];

    const healthTips = [
        {
            title: "Mindful Meditation",
            description: "Daily meditation practices for mental clarity and stress reduction",
            category: "Mental",
            tips: [
                "Start with 5 minutes of daily meditation",
                "Focus on your breath",
                "Find a quiet, comfortable space",
                "Try guided meditation apps",
                "Practice body scanning meditation"
            ]
        },
        {
            title: "Physical Exercise",
            description: "Regular exercise routines for better physical health",
            category: "Physical",
            tips: [
                "Aim for 30 minutes of daily exercise",
                "Mix cardio and strength training",
                "Take regular walking breaks",
                "Stay hydrated during workouts",
                "Stretch before and after exercise"
            ]
        },
        {
            title: "Emotional Balance",
            description: "Techniques for managing and understanding emotions",
            category: "Emotional",
            tips: [
                "Keep a daily emotion journal",
                "Practice self-compassion",
                "Express your feelings creatively",
                "Talk to someone you trust",
                "Take time to process your emotions"
            ]
        },
        {
            title: "Social Connections",
            description: "Building and maintaining healthy relationships",
            category: "Social",
            tips: [
                "Schedule regular catch-ups with friends",
                "Join community groups or clubs",
                "Practice active listening",
                "Show appreciation to others",
                "Set healthy boundaries"
            ]
        },
        {
            title: "Stress Management",
            description: "Effective strategies for managing daily stress",
            category: "Mental",
            tips: [
                "Practice deep breathing exercises",
                "Take regular breaks",
                "Maintain a consistent sleep schedule",
                "Learn to say no when needed",
                "Create a calming evening routine"
            ]
        },
        {
            title: "Healthy Eating Habits",
            description: "Nutrition tips for better physical health",
            category: "Physical",
            tips: [
                "Eat a balanced diet",
                "Plan meals in advance",
                "Stay hydrated throughout the day",
                "Practice mindful eating",
                "Include more whole foods"
            ]
        },
        {
            title: "Self-Care Practices",
            description: "Essential self-care routines for emotional wellbeing",
            category: "Emotional",
            tips: [
                "Set aside time for hobbies",
                "Create a relaxing environment",
                "Practice positive self-talk",
                "Take regular mental health breaks",
                "Engage in activities you enjoy"
            ]
        },
        {
            title: "Community Engagement",
            description: "Ways to stay connected with your community",
            category: "Social",
            tips: [
                "Volunteer for local causes",
                "Participate in community events",
                "Join social groups",
                "Share skills with others",
                "Attend local workshops"
            ]
        }
    ];

    const filteredTips = selectedCategory === 'all'
        ? healthTips
        : healthTips.filter(tip => tip.category === selectedCategory);

    return (
        <div className="health-container p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-6xl mx-auto"
            >
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                    Health Recommendations
                </h1>

                {/* Category Selection */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    {categories.map((category) => (
                        <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.label}
                        </motion.button>
                    ))}
                </div>

                {/* Tips Display */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTips.map((tip, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.1 }}
                            className="tip-card"
                        >
                            <h3 className="tip-title">{tip.title}</h3>
                            <p className="tip-description">{tip.description}</p>
                            <div className="tip-list">
                                {tip.tips.map((item, idx) => (
                                    <div key={idx} className="tip-item">
                                        <span className="tip-icon">•</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Health; 