import Sprite from "./Sprite.js";

export default class GameObject {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "/assets/npc2.png",
        });
    }
}