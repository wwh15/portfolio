export const tileSize = 64;

export const map = [
    [0, 0, 0, 0, 0, 0],
    [0, 4, 4, 4, 4, 0],
    [0, 4, 5,10, 4, 0],
    [0, 4, 4,13, 4, 0],
    [0, 4, 4, 4, 4, 0],
    [0, 0,19, 0, 0, 0]
];



export const gridWidth = map[0].length - 2;
export const gridHeight = map.length - 2;

/**
 * Returns true if the tile at (x, y) is walkable (i.e. not a wall).
 */
export function isWalkable(x, y) {
    return map[y] && map[y][x] !== 1;
}

/**
 * Returns true if any of the 4-adjacent tiles are interactable.
 */
const interactableTileIDs = [3, 4, 6, 8, 9, 10, 11, 14, 15, 17];

export function isInteractableNearby(x, y) {
    const dirs = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
    ];

    return dirs.some(([dx, dy]) => {
        const tile = map[y + dy]?.[x + dx];
        return interactableTileIDs.includes(tile);
    });
}
