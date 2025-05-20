export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move(dx, dy, gridWidth, gridHeight) {
        const newX = this.x + dx;
        const newY = this.y + dy;

        if (newX >= 0 && newX < gridWidth && newY >= 0 && newY < gridHeight) {
            this.x = newX;
            this.y = newY;
        }
    }
}
