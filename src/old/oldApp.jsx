import { useState } from 'react';
import { Player } from './game/player.js';
import GameCanvas from './canvas/GameCanvas.jsx';
import Modal from './components/Modal.jsx';
import './styles/game.css';


// Load sprite sheet (can move to preload if needed)
const playerSheet = new Image();
playerSheet.src = '/assets/me.png'; // Make sure this exists in public/assets/

const tileset = new Image();
tileset.src = '/assets/new.png';


export default function OldApp() {
    const [player] = useState(new Player(1, 1));
    const [showModal, setShowModal] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);

    return (
        <div className="game-container">
            <div className="canvas-wrapper">
                <GameCanvas
                    player={player}
                    spriteSheet={playerSheet}
                    tileset={tileset}
                    onShowModal={() => setShowModal(true)}
                    onUpdatePrompt={setShowPrompt}
                />
                {showPrompt && (
                    <div className="interact-prompt">Press E to interact</div>
                )}
                {showModal && (
                    <Modal title="Projects" onClose={() => setShowModal(false)} />
                )}
            </div>
        </div>
    );
}
