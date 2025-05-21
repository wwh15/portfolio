export default class Sprite {
    constructor(config) {

        // Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        // Shadow
        this.shadow = new Image();
        this.useShadow = true;

        if (this.useShadow) {
            this.shadow.src = "/assets/shadow.png";
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true;
        }

        // Configure animation and initial state
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ],
            walkDown: [
                [0,0], [1,0], [2,0], [3,0]
            ]
        };

        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        // Reference game object
        this.gameObject = config.gameObject;
    }

    draw(ctx) {
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

        this.isLoaded && ctx.drawImage(this.image,
            0, // Left cut
            0, // Top cut
            32, // Cut width
            32, // Cut height
            x,
            y,
            32, // width
            32, //height
        );
    }
}