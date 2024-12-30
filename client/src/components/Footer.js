import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="text-gradient">TheraConnect</span>
                        </Link>
                        <p className="footer-tagline">
                            Empowering mental wellness through AI companionship
                        </p>
                        <div className="social-links">
                            {['twitter', 'github', 'linkedin'].map((social) => (
                                <motion.a
                                    key={social}
                                    href={`https://${social}.com`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link"
                                    whileHover={{ y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <i className={`fab fa-${social}`}></i>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3 className="footer-title">Quick Links</h3>
                        <Link to="/chat" className="footer-link">Chat</Link>
                        <Link to="/mood" className="footer-link">Mood Tracking</Link>
                        <Link to="/community" className="footer-link">Community</Link>
                    </div>

                    {/* Resources */}
                    <div className="footer-links">
                        <h3 className="footer-title">Resources</h3>
                        <Link to="/about" className="footer-link">About Us</Link>
                        <Link to="/blog" className="footer-link">Blog</Link>
                        <Link to="/faq" className="footer-link">FAQ</Link>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact">
                        <h3 className="footer-title">Contact</h3>
                        <a href="mailto:contact@TheraConnect.com" className="footer-link">
                            contact@TheraCOnnect.com
                        </a>
                        <p className="footer-text">
                            123 Wellness Street<br />
                            Mental Health District<br />
                            12345
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {new Date().getFullYear()} MindfulAI. All rights reserved.
                    </p>
                    <div className="footer-bottom-links">
                        <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
                        <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 