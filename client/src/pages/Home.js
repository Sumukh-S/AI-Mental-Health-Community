import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <div className="home-container">
            <motion.div
                className="hero-section"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className="hero-title"
                    variants={itemVariants}
                >
                    Your AI Companion for <br />
                    <span className="text-gradient">Mental Wellness</span>
                </motion.h1>

                <motion.p
                    className="hero-subtitle"
                    variants={itemVariants}
                >
                    Experience personalized support and guidance through your mental health journey
                </motion.p>

                <motion.div
                    className="hero-buttons"
                    variants={itemVariants}
                >
                    <Link to="/chat" className="button-primary">
                        Start Chatting
                    </Link>
                    <Link to="/about" className="button-secondary">
                        Learn More
                    </Link>
                </motion.div>
            </motion.div>

            <motion.div
                className="features-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {[
                    {
                        title: "AI Chat Support",
                        description: "24/7 conversation partner trained to provide emotional support",
                        icon: "💬"
                    },
                    {
                        title: "Mood Tracking",
                        description: "Monitor and analyze your emotional patterns",
                        icon: "📊"
                    },
                    {
                        title: "Community",
                        description: "Connect with others on similar journeys",
                        icon: "👥"
                    },
                    {
                        title: "Resources",
                        description: "Access mental health tools and information",
                        icon: "📚"
                    }
                ].map((feature, index) => (
                    <motion.div
                        key={index}
                        className="feature-card"
                        variants={itemVariants}
                    >
                        <div className="feature-icon">{feature.icon}</div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default Home; 