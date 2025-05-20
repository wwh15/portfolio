export default function Modal({ title, onClose }) {
    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10
        }}>
            <div style={{
                backgroundColor: 'white',
                color: 'black',
                padding: '24px',
                borderRadius: '8px',
                width: '300px',
                textAlign: 'center'
            }}>
                <h2>{title}</h2>
                <p>This is a modal! You walked up to an interactable tile.</p>
                <button onClick={onClose} style={{ marginTop: '16px', padding: '8px 16px' }}>Close</button>
            </div>
        </div>
    );
}
