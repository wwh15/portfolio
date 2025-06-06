import GameObject from "./GameObject.js";

export default class Overworld {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0);
        }
        image.src = "/assets/DemoLower.png"

        // Place game objects
        const hero = new GameObject({
            x: 5,
            y: 6,
        })

        const npc1 = new GameObject({
            x: 7,
            y: 9,
            src: "/assets/npc1.png"
        })
        setTimeout(() => {
            hero.sprite.draw(this.ctx)
            npc1.sprite.draw(this.ctx)
        }, 200)
    }
}