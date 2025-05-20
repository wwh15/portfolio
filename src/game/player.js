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

        this.lastFrameChange = performance.now();
        this.frameDelay = 120;

        this.inputQueue = [];         // NEW
        this.currentDirection = null; // NEW
    }

    enqueueMove(direction) {
        if (!this.currentDirection) {
            this.currentDirection = direction;
        } else if (this.inputQueue.length === 0) {
            this.inputQueue.push(direction); // limit queue to 1
        }
    }

    dequeueMove() {
        if (this.inputQueue.length > 0) {
            this.currentDirection = this.inputQueue.shift();
        } else {
            this.currentDirection = null;
        }
    }

    updatePosition(isWalkable) {
        if (!this.isMoving && this.currentDirection) {
            const [dx, dy] = this.directionToDelta(this.currentDirection);
            const newX = this.x + dx;
            const newY = this.y + dy;
            if (isWalkable(newX, newY)) {
                this.startMove(dx, dy);
            } else {
                this.dequeueMove(); // invalid direction, discard
            }
        }

        if (!this.isMoving) return;

        const speed = .5;
        const now = performance.now();

        const reachedX = Math.abs(this.pixelX - this.targetX) <= speed;
        const reachedY = Math.abs(this.pixelY - this.targetY) <= speed;

        if (!reachedX) this.pixelX += this.pixelX < this.targetX ? speed : -speed;
        if (!reachedY) this.pixelY += this.pixelY < this.targetY ? speed : -speed;

        if (now - this.lastFrameChange > this.frameDelay) {
            this.frame = (this.frame + 1) % 4;
            this.lastFrameChange = now;
        }

        if (reachedX && reachedY) {
            this.pixelX = this.targetX;
            this.pixelY = this.targetY;
            this.isMoving = false;
            this.frame = 0;
            this.dequeueMove();
        }
    }

    directionToDelta(dir) {
        return {
            up: [0, -1],
            down: [0, 1],
            left: [-1, 0],
            right: [1, 0]
        }[dir];
    }

    startMove(dx, dy) {
        this.x += dx;
        this.y += dy;
        this.targetX = this.x * 64;
        this.targetY = this.y * 64;
        this.isMoving = true;
        this.direction = this.getDirection(dx, dy);
        this.lastFrameChange = performance.now();
    }

    getDirection(dx, dy) {
        if (dx === 1) return 'right';
        if (dx === -1) return 'left';
        if (dy === 1) return 'down';
        if (dy === -1) return 'up';
        return this.direction;
    }
}
