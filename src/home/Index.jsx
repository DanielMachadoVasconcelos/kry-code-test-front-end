import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Kry Code Test - Manage service availability</h1>
            <p>A Code test exemple to manage and track services availability</p>
            <p><Link to="services">&gt;&gt; Manage Services</Link></p>
        </div>
    );
}

export { Home };