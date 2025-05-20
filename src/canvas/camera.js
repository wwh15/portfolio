export function getCameraPosition(player, canvasWidth, canvasHeight) {
    return {
        x: player.pixelX - canvasWidth / 2 + 32, // 32 = tileSize / 2
        y: player.pixelY - canvasHeight / 2 + 32,
    };
}
