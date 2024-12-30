import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/games.css';

const Games = () => {
    const [activeGame, setActiveGame] = useState(null);
    const [score, setScore] = useState(0);
    const canvasRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);

    const games = [
        {
            id: 'flappy',
            title: 'Mindful Bird',
            description: 'Stay focused and guide your bird through peaceful obstacles',
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 'meditation',
            title: 'Zen Garden',
            description: 'Create your own peaceful garden with calming interactions',
            color: 'from-blue-500 to-green-500'
        }
    ];

    const startGame = (gameId) => {
        setActiveGame(gameId);
        setScore(0);
        setGameStarted(true);
    };

    const stopGame = () => {
        setActiveGame(null);
        setGameStarted(false);
    };

    return (
        <div className="games-container p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-6xl mx-auto"
            >
                <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Relaxation Games
                </h1>

                {!activeGame ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {games.map((game) => (
                            <motion.div
                                key={game.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="game-card"
                                onClick={() => startGame(game.id)}
                            >
                                <h2 className={`game-title bg-gradient-to-r ${game.color}`}>
                                    {game.title}
                                </h2>
                                <p className="text-gray-600 mb-4">{game.description}</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="game-button"
                                >
                                    Play Now
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="game-container"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={stopGame}
                                className="text-purple-600 hover:text-purple-700 font-medium"
                            >
                                ← Back to Games
                            </button>
                            <div className="score-display">Score: {score}</div>
                        </div>

                        <canvas
                            ref={canvasRef}
                            className="game-canvas"
                        />

                        <div className="game-controls">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="game-button"
                                onClick={() => setGameStarted(!gameStarted)}
                            >
                                {gameStarted ? 'Pause' : 'Start'}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default Games; 