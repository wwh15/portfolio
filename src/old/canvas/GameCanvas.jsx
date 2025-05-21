import {useEffect, useRef} from 'react';
import {drawMap, drawPlayer} from './draw.js';
import {getCameraPosition} from './camera.js';
import {attachInput} from '../game/input.js';
import {gridHeight, gridWidth, isInteractableNearby, isWalkable, map, tileSize} from '../game/map.js';

export default function GameCanvas({ player, spriteSheet, tileset, onShowModal, onUpdatePrompt }) {
    const canvasRef = useRef(null);
    const canvasWidth = gridWidth * tileSize;
    const canvasHeight = gridHeight * tileSize;

    // Attach input
    useEffect(() => {
        return attachInput(player, () => {
            if (isInteractableNearby(player.x, player.y)) {
                onShowModal();
            }
        });
    }, [player, onShowModal]);

    // Game loop
    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');

        const loop = () => {
            player.updatePosition(isWalkable);

            const camera = getCameraPosition(player, canvasWidth, canvasHeight);

            // Update prompt status
            if (!player.isMoving) {
                onUpdatePrompt(isInteractableNearby(player.x, player.y));
            }

            // Draw
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            drawMap(ctx, map, camera, tileset);
            drawPlayer(ctx, player, camera, spriteSheet);

            requestAnimationFrame(loop);
        };

        loop();
    }, [canvasHeight, canvasWidth, onUpdatePrompt, player, spriteSheet, tileset]);

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="game-canvas"
        />
    );
}
