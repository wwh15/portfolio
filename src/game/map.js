export const tileSize = 64;

export const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 2, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const gridWidth = map[0].length;
export const gridHeight = map.length;

export function isWalkable(x, y) {
    return map[y] && map[y][x] !== 1;
}

export function isInteractableNearby(x, y) {
    const directions = [
        [0, -1], [0, 1], [1, 0], [-1, 0],
    ];
    return directions.some(([dx, dy]) => {
        const tile = map[y + dy]?.[x + dx];
        return tile === 2;
    });
}
