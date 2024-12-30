import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/header.css';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        setIsOpen(false);
    };

    return (
        <header className="header-container">
            <nav className="nav-container">
                <div className="flex items-center justify-between h-full">

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="flex-shrink-0">
                            <img src="/logo.png" alt="TheraConnect Logo" className="h-6 w-auto object-contain" />
                        </Link>
                        <Link
                            to="/community"
                            className={`nav-link ${location.pathname === '/community' ? 'nav-link-active' : 'nav-link-default'}`}
                        >
                            {/* Logo */}
                            <span className="nav-icon">👥</span>
                            <span className="nav-text">Community</span>
                        </Link>

                        <Link
                            to="/games"
                            className={`nav-link ${location.pathname === '/games' ? 'nav-link-active' : 'nav-link-default'}`}
                        >
                            <span className="nav-icon">🎮</span>
                            <span className="nav-text">Games</span>
                        </Link>

                        <Link
                            to="/chat"
                            className={`nav-link ${location.pathname === '/chat' ? 'nav-link-active' : 'nav-link-default'}`}
                        >
                            <span className="nav-icon">💭</span>
                            <span className="nav-text">Chat</span>
                        </Link>

                        {user && (
                            <>
                                <Link
                                    to="/health"
                                    className={`nav-link ${location.pathname === '/health' ? 'nav-link-active' : 'nav-link-default'}`}
                                >
                                    <span className="nav-icon">❤️</span>
                                    <span className="nav-text">Health</span>
                                </Link>

                                <Link
                                    to="/mood"
                                    className={`nav-link ${location.pathname === '/mood' ? 'nav-link-active' : 'nav-link-default'}`}
                                >
                                    <span className="nav-icon">😊</span>
                                    <span className="nav-text">Mood</span>
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="nav-link nav-link-default"
                                >
                                    <span className="nav-icon">🚪</span>
                                    <span className="nav-text">Logout</span>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-b border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                to="/community"
                                onClick={() => setIsOpen(false)}
                                className={`mobile-nav-link ${location.pathname === '/community' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'}`}
                            >
                                <span className="mr-2">👥</span>
                                Community
                            </Link>

                            <Link
                                to="/games"
                                onClick={() => setIsOpen(false)}
                                className={`mobile-nav-link ${location.pathname === '/games' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'}`}
                            >
                                <span className="mr-2">🎮</span>
                                Games
                            </Link>

                            <Link
                                to="/chat"
                                onClick={() => setIsOpen(false)}
                                className={`mobile-nav-link ${location.pathname === '/chat' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'}`}
                            >
                                <span className="mr-2">💭</span>
                                Chat
                            </Link>

                            {user && (
                                <>
                                    <Link
                                        to="/health"
                                        onClick={() => setIsOpen(false)}
                                        className={`mobile-nav-link ${location.pathname === '/health' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'}`}
                                    >
                                        <span className="mr-2">❤️</span>
                                        Health
                                    </Link>

                                    <Link
                                        to="/mood"
                                        onClick={() => setIsOpen(false)}
                                        className={`mobile-nav-link ${location.pathname === '/mood' ? 'bg-purple-50 text-purple-600' : 'text-gray-600'}`}
                                    >
                                        <span className="mr-2">😊</span>
                                        Mood
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="mobile-nav-link text-gray-600 w-full text-left"
                                    >
                                        <span className="mr-2">🚪</span>
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;