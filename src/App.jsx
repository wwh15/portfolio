import { useEffect, useRef, useState } from 'react';
import { Player } from './game/player';
import { tileSize, gridWidth, gridHeight } from './game/map';

const canvasWidth = gridWidth * tileSize;
const canvasHeight = gridHeight * tileSize;

export default function App() {
    const canvasRef = useRef(null);
    const [player, setPlayer] = useState(new Player(1, 1));

    useEffect(() => {
        const handleKeyDown = (e) => {
            const updatedPlayer = new Player(player.x, player.y);

            if (e.key === 'ArrowUp') updatedPlayer.move(0, -1, gridWidth, gridHeight);
            if (e.key === 'ArrowDown') updatedPlayer.move(0, 1, gridWidth, gridHeight);
            if (e.key === 'ArrowLeft') updatedPlayer.move(-1, 0, gridWidth, gridHeight);
            if (e.key === 'ArrowRight') updatedPlayer.move(1, 0, gridWidth, gridHeight);

            setPlayer(updatedPlayer);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [player]);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw grid
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                ctx.strokeStyle = '#333';
                ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
            }
        }

        // Draw player
        ctx.fillStyle = 'lime';
        ctx.fillRect(
            player.x * tileSize + 4,
            player.y * tileSize + 4,
            tileSize - 8,
            tileSize - 8
        );
    }, [player]);

    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                style={{ border: '2px solid white' }}
            />
        </div>
    );
}
