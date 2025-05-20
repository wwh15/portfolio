export const tileSize = 64;

export const map = Array.from({ length: 10 }, (_, y) =>
    Array.from({ length: 10 }, (_, x) =>
        y === 0 || y === 9 || x === 0 || x === 9 ? 1 : 0
    )
);


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
