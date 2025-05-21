import { useEffect } from "react";
import init from "./init.js";

export default function App() {
    useEffect(() => {
        init();
    }, []);

    return (
        <div>
            <div className="game-container">
                <canvas className="game-canvas" width="352" height="198"></canvas>
            </div>
        </div>
    );
}
