import { tileSize, map } from '../game/map.js';

export function getCameraPosition(player, canvasWidth, canvasHeight) {
    const mapWidthPx = map[0].length * tileSize;
    const mapHeightPx = map.length * tileSize;

    let x = player.pixelX - canvasWidth / 2 + tileSize / 2;
    let y = player.pixelY - canvasHeight / 2 + tileSize / 2;

    x = Math.max(0, Math.min(x, mapWidthPx - canvasWidth));
    y = Math.max(0, Math.min(y, mapHeightPx - canvasHeight));

    return { x, y };
}
