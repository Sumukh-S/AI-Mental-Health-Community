import React, { useState } from 'react';
import TicTacToe from '../components/games/TicTacToe';
import MemoryGame from '../components/games/MemoryGame';
import '../styles/games.css';

const Games = () => {
    const [selectedGame, setSelectedGame] = useState(null);

    const games = [
        { id: 'tictactoe', name: 'Tic Tac Toe', component: TicTacToe },
        { id: 'memory', name: 'Memory Game', component: MemoryGame },
    ];

    return (
        <div className="games-container">
            {!selectedGame ? (
                <div className="games-menu">
                    <h2 className="text-2xl font-bold mb-6 text-center">Choose a Game</h2>
                    <div className="games-grid">
                        {games.map((game) => (
                            <button
                                key={game.id}
                                className="game-card"
                                onClick={() => setSelectedGame(game)}
                            >
                                <h3 className="game-title">{game.name}</h3>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="game-view">
                    <button
                        className="back-button"
                        onClick={() => setSelectedGame(null)}
                    >
                        ← Back to Games
                    </button>
                    <selectedGame.component />
                </div>
            )}
        </div>
    );
};

export default Games; 