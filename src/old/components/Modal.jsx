import '../styles/game.css';

export default function Modal({ title, onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <p>This is a modal! You walked up to an interactable tile.</p>
                <button className="modal-button" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}
