import {tileSize} from "../game/map.js";

export function drawMap(ctx, map, camera, tileset) {
    if (!tileset || !tileset.complete || tileset.naturalWidth === 0) return;

    const tilesPerRow = 4;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            const tileIndex = map[y][x];
            const sx = (tileIndex % tilesPerRow) * tileSize;
            const sy = Math.floor(tileIndex / tilesPerRow) * tileSize;

            const screenX = x * tileSize - camera.x;
            const screenY = y * tileSize - camera.y;

            ctx.drawImage(
                tileset,
                sx, sy, tileSize, tileSize,
                screenX, screenY, tileSize, tileSize
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

