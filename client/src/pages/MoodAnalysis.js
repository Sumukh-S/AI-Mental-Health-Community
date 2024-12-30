import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import '../styles/mood.css';

const MoodAnalysis = () => {
    const [formData, setFormData] = useState({
        mood: '',
        intensity: 3,
        activities: [],
        thoughts: '',
        sleepHours: 7
    });
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const moodOptions = [
        { value: 'Happy', emoji: '😊' },
        { value: 'Sad', emoji: '😢' },
        { value: 'Anxious', emoji: '😰' },
        { value: 'Calm', emoji: '😌' },
        { value: 'Angry', emoji: '😠' },
        { value: 'Excited', emoji: '🤗' },
        { value: 'Tired', emoji: '😴' },
        { value: 'Stressed', emoji: '😫' }
    ];

    const activityOptions = [
        'Exercise', 'Reading', 'Meditation', 'Work', 'Social Activity',
        'Hobbies', 'Screen Time', 'Outdoor Activity', 'Rest'
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await api.post('/mood', formData);
            setRecommendations(response.data.recommendations);
            setSubmitted(true);
        } catch (error) {
            console.error('Error submitting mood:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleActivity = (activity) => {
        setFormData(prev => ({
            ...prev,
            activities: prev.activities.includes(activity)
                ? prev.activities.filter(a => a !== activity)
                : [...prev.activities, activity]
        }));
    };

    return (
        <div className="mood-container p-4">
            <div className="mood-card">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
                >
                    How are you feeling today?
                </motion.h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Mood Selection */}
                    <div className="form-section">
                        <h2 className="text-xl font-semibold mb-4">Select your mood</h2>
                        <div className="mood-selector">
                            {moodOptions.map((option) => (
                                <motion.button
                                    key={option.value}
                                    type="button"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setFormData({ ...formData, mood: option.value })}
                                    className={`mood-button ${formData.mood === option.value ? 'selected' : ''}`}
                                >
                                    <div className="mood-emoji">{option.emoji}</div>
                                    <div>{option.value}</div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Mood Intensity */}
                    <div className="form-section">
                        <h2 className="text-xl font-semibold mb-4">How intense is this feeling?</h2>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={formData.intensity}
                            onChange={(e) => setFormData({ ...formData, intensity: parseInt(e.target.value) })}
                            className="intensity-slider"
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-2">
                            <span>Mild</span>
                            <span>Moderate</span>
                            <span>Strong</span>
                        </div>
                    </div>

                    {/* Activities */}
                    <div className="form-section">
                        <h2 className="text-xl font-semibold mb-4">What have you been doing?</h2>
                        <div className="flex flex-wrap gap-3">
                            {activityOptions.map((activity) => (
                                <motion.div
                                    key={activity}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => toggleActivity(activity)}
                                    className={`activity-tag ${formData.activities.includes(activity) ? 'selected' : 'bg-white/50'
                                        }`}
                                >
                                    {activity}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Thoughts */}
                    <div className="form-section">
                        <h2 className="text-xl font-semibold mb-4">Any thoughts you'd like to share?</h2>
                        <textarea
                            value={formData.thoughts}
                            onChange={(e) => setFormData({ ...formData, thoughts: e.target.value })}
                            className="thought-input"
                            rows="4"
                            placeholder="Write your thoughts here..."
                        />
                    </div>

                    {/* Sleep Hours */}
                    <div className="form-section">
                        <h2 className="text-xl font-semibold mb-4">Hours of sleep last night</h2>
                        <input
                            type="number"
                            value={formData.sleepHours}
                            onChange={(e) => setFormData({ ...formData, sleepHours: parseInt(e.target.value) })}
                            min="0"
                            max="24"
                            className="sleep-input"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
                            />
                        ) : (
                            'Submit'
                        )}
                    </motion.button>
                </form>

                {/* Recommendations */}
                <AnimatePresence>
                    {submitted && recommendations.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="recommendations-card"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-purple-800">
                                Recommendations
                            </h2>
                            <ul className="space-y-3">
                                {recommendations.map((recommendation, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center space-x-3"
                                    >
                                        <span className="text-purple-600">•</span>
                                        <span>{recommendation}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MoodAnalysis; 