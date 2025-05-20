import { useEffect, useRef } from 'react';

function App() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // TEMP: fill canvas black and draw a "player" dot
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'lime';
        ctx.fillRect(50, 50, 10, 10); // player square

    }, []);

    return (
        <div className="w-full h-screen flex items-center justify-center bg-gray-900">
            <canvas
                ref={canvasRef}
                width={320}
                height={320}
                className="border border-white"
            />
        </div>
    );
}

export default App;
