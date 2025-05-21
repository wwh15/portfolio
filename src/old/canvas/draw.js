import {tileSize} from "../game/map.js";

export function drawMap(ctx, map, camera, tileset) {
    const tileSize = 64;
    const tilesPerRow = 48;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            const tileIndex = map[y][x];

            const sx = (tileIndex % tilesPerRow) * tileSize;
            const sy = Math.floor(tileIndex / tilesPerRow) * tileSize;

            const screenX = x * tileSize - camera.x;
            const screenY = y * tileSize - camera.y;

            ctx.drawImage(
                tileset,
                sx, sy, tileSize, tileSize, // source (tileset slice)
                screenX, screenY, tileSize, tileSize // destination on canvas
            );
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
    const sx = player.frame * spriteSize;
    const sy = directionMap[player.direction] * spriteSize;

    const drawX = player.pixelX - camera.x;
    const drawY = player.pixelY - camera.y;

    const shadowWidth = 36;
    const shadowHeight = 14;
    const shadowOffsetY = 48;

    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.beginPath();
    ctx.ellipse(
        drawX + tileSize / 2,         // center X
        drawY + shadowOffsetY,        // center Y (beneath feet)
        shadowWidth / 2,
        shadowHeight / 2,
        0,
        0,
        2 * Math.PI
    );
    ctx.fill();
    ctx.restore();

    // ✅ Draw the player sprite
    if (spriteSheet.complete && spriteSheet.naturalWidth > 0) {
        ctx.drawImage(
            spriteSheet,
            sx, sy, spriteSize, spriteSize,
            drawX, drawY,
            tileSize, tileSize
        );
    }
}


