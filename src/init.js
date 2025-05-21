import Overworld from "./Overworld.js";

export default function () {
    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    });
    overworld.init();
}