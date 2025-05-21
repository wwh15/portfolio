import { useState } from 'react';
import { Player } from './game/player';
import GameCanvas from './canvas/GameCanvas';
import Modal from './components/Modal';
import './styles/game.css';


// Load sprite sheet (can move to preload if needed)
const playerSheet = new Image();
playerSheet.src = '/assets/pokemon.png'; // Make sure this exists in public/assets/

const tileset = new Image();
tileset.src = '/assets/tileset.png';


export default function App() {
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
