'use client';
import {useState, useEffect} from 'react';

export default function ClientCard() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log('ClientCard mounted');
    }, []);

    return (
        <div className="client-card">
            <h2>Client Card Component</h2>
            <p>This component is rendered on the client side.</p>
            <p>Button clicked {count} times.</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}