import { useEffect, useRef } from 'react';
import { drawMap, drawPlayer } from './draw';
import { getCameraPosition } from './camera';
import { attachInput } from '../game/input';
import { isWalkable, isInteractableNearby, map, tileSize, gridWidth, gridHeight } from '../game/map';

export default function GameCanvas({ player, spriteSheet, onShowModal, onUpdatePrompt }) {
    const canvasRef = useRef(null);
    const canvasWidth = gridWidth * tileSize;
    const canvasHeight = gridHeight * tileSize;

    // Attach input
    useEffect(() => {
        const detach = attachInput(player, () => {
            if (isInteractableNearby(player.x, player.y)) {
                onShowModal();
            }
        });
        return detach;
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
            drawMap(ctx, map, camera);
            drawPlayer(ctx, player, camera, spriteSheet);

            requestAnimationFrame(loop);
        };

        loop();
    }, [player]);

    return (
        <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="game-canvas"
        />
    );
}
