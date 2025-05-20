const directionKeys = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
};

/**
 * Sets up keyboard listeners and routes input to the player.
 * @param {Player} player
 * @param {Function} onInteract - called when 'E' is pressed near an interactable
 */
export function attachInput(player, onInteract) {
    function handleKeyDown(e) {
        const dir = directionKeys[e.key];
        if (dir) {
            player.enqueueMove(dir);
        }

        if (e.key === 'e' || e.key === 'E') {
            onInteract();
        }
    }

    window.addEventListener('keydown', handleKeyDown);

    // cleanup function to detach input listeners
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}
