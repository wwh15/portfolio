export class Player {
    constructor(x, y, direction = 'down') {
        this.x = x;
        this.y = y;
        this.direction = direction;

        this.pixelX = x * 64;
        this.pixelY = y * 64;
        this.targetX = this.pixelX;
        this.targetY = this.pixelY;

        this.isMoving = false;
        this.frame = 0;

        this.lastFrameChange = performance.now(); // ← NEW
        this.frameDelay = 120; // milliseconds per frame (tweak this)
    }

    updatePosition() {
        if (!this.isMoving) return;

        const speed = .5; // pixels per frame
        const now = performance.now();

        const reachedX = Math.abs(this.pixelX - this.targetX) <= speed;
        const reachedY = Math.abs(this.pixelY - this.targetY) <= speed;

        if (!reachedX) this.pixelX += this.pixelX < this.targetX ? speed : -speed;
        if (!reachedY) this.pixelY += this.pixelY < this.targetY ? speed : -speed;

        // 🐢 Slow animation: only update frame every X ms
        if (now - this.lastFrameChange > this.frameDelay) {
            this.frame = (this.frame + 1) % 4;
            this.lastFrameChange = now;
        }

        if (reachedX && reachedY) {
            this.pixelX = this.targetX;
            this.pixelY = this.targetY;
            this.isMoving = false;
            this.frame = 0;
        }
    }

    startMove(dx, dy) {
        if (this.isMoving) return;

        this.x += dx;
        this.y += dy;

        this.direction = this.getDirection(dx, dy);
        this.targetX = this.x * 64;
        this.targetY = this.y * 64;
        this.isMoving = true;

        this.lastFrameChange = performance.now(); // reset on new move
    }

    getDirection(dx, dy) {
        if (dx === 1) return 'right';
        if (dx === -1) return 'left';
        if (dy === 1) return 'down';
        if (dy === -1) return 'up';
        return this.direction;
    }
}
