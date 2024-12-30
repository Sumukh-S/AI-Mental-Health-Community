import { useEffect, useRef, useState } from 'react';

function FlappyBird() {
    const canvasRef = useRef(null);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const bird = {
            x: 50,
            y: canvas.height / 2,
            velocity: 0,
            gravity: 0.5,
            jump: -8
        };

        const pipes = [];
        let frameCount = 0;

        const jump = () => {
            if (!gameOver) {
                bird.velocity = bird.jump;
            }
        };

        const update = () => {
            if (gameOver) return;

            // Update bird
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;

            // Generate pipes
            if (frameCount % 100 === 0) {
                const gap = 150;
                const height = Math.random() * (canvas.height - gap - 100) + 50;
                pipes.push({
                    x: canvas.width,
                    height: height,
                    gap: gap
                });
            }

            // Update pipes
            for (let i = pipes.length - 1; i >= 0; i--) {
                pipes[i].x -= 2;

                // Check collision
                if (
                    bird.x + 20 > pipes[i].x &&
                    bird.x < pipes[i].x + 50 &&
                    (bird.y < pipes[i].height || bird.y + 20 > pipes[i].height + pipes[i].gap)
                ) {
                    setGameOver(true);
                }

                if (pipes[i].x < -50) {
                    pipes.splice(i, 1);
                    setScore(score + 1);
                }
            }

            // Check boundaries
            if (bird.y > canvas.height || bird.y < 0) {
                setGameOver(true);
            }

            frameCount++;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw bird
            ctx.fillStyle = 'yellow';
            ctx.fillRect(bird.x, bird.y, 20, 20);

            // Draw pipes
            ctx.fillStyle = 'green';
            pipes.forEach(pipe => {
                ctx.fillRect(pipe.x, 0, 50, pipe.height);
                ctx.fillRect(pipe.x, pipe.height + pipe.gap, 50, canvas.height);
            });

            // Draw score
            ctx.fillStyle = 'black';
            ctx.font = '24px Arial';
            ctx.fillText(`Score: ${score}`, 10, 30);
        };

        const gameLoop = () => {
            update();
            draw();
            animationFrameId = requestAnimationFrame(gameLoop);
        };

        canvas.addEventListener('click', jump);
        gameLoop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('click', jump);
        };
    }, [gameOver, score]);

    return (
        <div className="text-center">
            <canvas
                ref={canvasRef}
                width={400}
                height={600}
                className="border border-gray-300"
            />
            {gameOver && (
                <div className="mt-4">
                    <p className="text-xl">Game Over! Score: {score}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
}

export default FlappyBird; 