import { useEffect, useRef, useState } from 'react';
import { Player } from './game/player';
import { tileSize, map, gridWidth, gridHeight, isWalkable, isInteractableNearby } from './game/map';
import Modal from './components/Modal';

// Load player sprite
const playerSheet = new Image();
playerSheet.src = '/src/assets/pokemon.png'; // Put your 64x64 sprite sheet here

const canvasWidth = gridWidth * tileSize;
const canvasHeight = gridHeight * tileSize;

export default function App() {
    const canvasRef = useRef(null);
    const [player] = useState(new Player(1, 1)); // player is stateful via object mutation
    const [showModal, setShowModal] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);

    // Handle key input
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (player.isMoving) return;

            const dxdyMap = {
                ArrowUp: [0, -1],
                ArrowDown: [0, 1],
                ArrowLeft: [-1, 0],
                ArrowRight: [1, 0],
            };

            if (dxdyMap[e.key]) {
                const [dx, dy] = dxdyMap[e.key];
                const newX = player.x + dx;
                const newY = player.y + dy;

                if (isWalkable(newX, newY)) {
                    player.startMove(dx, dy);
                    setShowPrompt(isInteractableNearby(newX, newY));
                }
            }

            if (e.key === 'e' || e.key === 'E') {
                if (isInteractableNearby(player.x, player.y)) {
                    setShowModal(true);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [player]);

    // Game render loop
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        const directionMap = {
            down: 0,
            left: 1,
            right: 2,
            up: 3,
        };

        const draw = () => {
            player.updatePosition();

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw map
            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[0].length; x++) {
                    let fill = '#999';
                    if (map[y][x] === 1) fill = '#333'; // wall
                    else if (map[y][x] === 2) fill = '#0ff'; // interactable
                    ctx.fillStyle = fill;
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
                    ctx.strokeStyle = '#222';
                    ctx.strokeRect(x * tileSize, y * tileSize, tileSize, tileSize);
                }
            }

            // Draw player
            const spriteSize = 64;
            const sx = player.frame * spriteSize;
            const sy = directionMap[player.direction] * spriteSize;

            if (playerSheet.complete && playerSheet.naturalWidth > 0) {
                ctx.drawImage(
                    playerSheet,
                    sx, sy, spriteSize, spriteSize,
                    player.pixelX, player.pixelY,
                    tileSize, tileSize
                );
            }

            requestAnimationFrame(draw);
        };

        draw();
    }, [player]);

    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
            <div style={{ position: 'relative' }}>
                <canvas
                    ref={canvasRef}
                    width={canvasWidth}
                    height={canvasHeight}
                    style={{ border: '2px solid white' }}
                />
                {showPrompt && (
                    <div style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        backgroundColor: 'rgba(255,255,255,0.8)',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        color: 'black',
                        fontWeight: 'bold'
                    }}>
                        Press E to interact
                    </div>
                )}
                {showModal && (
                    <Modal title="Projects" onClose={() => setShowModal(false)} />
                )}
            </div>
        </div>
    );
}
