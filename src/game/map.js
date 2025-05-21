export const tileSize = 64;

// tile IDs are arbitrary examples — match to your tileset layout
export const map = [
    [1, 1, 1, 1, 1, 1, 1, 1], // walls (top row)
    [1, 15, 15, 3, 3, 15, 15, 1], // floor + bed
    [1, 15, 15, 15, 15, 15, 15, 1], // floor
    [1, 15, 15, 2, 2, 15, 15, 1], // floor + rug
    [1, 15, 15, 15, 15, 4, 15, 1], // floor + desk
    [1, 1, 1, 1, 1, 1, 1, 1], // walls (bottom row)
];



export const gridWidth = map[0].length;
export const gridHeight = map.length;

/**
 * Returns true if the tile at (x, y) is walkable (i.e. not a wall).
 */
export function isWalkable(x, y) {
    return map[y] && map[y][x] !== 1;
}

/**
 * Returns true if any of the 4-adjacent tiles are interactable.
 */
export function isInteractableNearby(x, y) {
    const dirs = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ];

    return dirs.some(([dx, dy]) => {
        const tile = map[y + dy]?.[x + dx];
        return tile === 2;
    });
}
