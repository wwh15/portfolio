import { tileSize } from '../game/map';

export function drawMap(ctx, map, camera) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            let fill = '#999';
            if (map[y][x] === 1) fill = '#333'; // wall
            else if (map[y][x] === 2) fill = '#0ff'; // interactable

            const screenX = x * tileSize - camera.x;
            const screenY = y * tileSize - camera.y;

            ctx.fillStyle = fill;
            ctx.fillRect(screenX, screenY, tileSize, tileSize);
            ctx.strokeStyle = '#222';
            ctx.strokeRect(screenX, screenY, tileSize, tileSize);
        }
    }
}

export function drawPlayer(ctx, player, camera, spriteSheet) {
    const directionMap = {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
    };

    const spriteSize = 64;
    const sx = player.frame * spriteSize; // ← this cycles left-right across sheet
    const sy = directionMap[player.direction] * spriteSize; // ← this picks correct row

    if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
        ctx.drawImage(
            spriteSheet,
            sx, sy, spriteSize, spriteSize, // source rectangle from spritesheet
            player.pixelX - camera.x,
            player.pixelY - camera.y,
            spriteSize, spriteSize // destination size
        );
    }
}

