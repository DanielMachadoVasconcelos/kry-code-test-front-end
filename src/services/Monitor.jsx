import React from 'react';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import config from 'config';

const baseUrl = `${config.baseUri}/poke-results-emitter`;

const socket = io(`${baseUrl}`, {
    transports: ['websocket', 'polling']
});


function Monitor({ match }) {

    const { id } = match.params;
    const [data, setData] = useState([]);

    useEffect(() => {
        socket.on('service-poke-result', pokeResult => {
            setData(currentData => [...currentData, pokeResult]);
        });
    }, []);

    return (
        <div>
            <h1>{id}</h1>
            <LineChart width={600} height={500} data={data}>
                <XAxis dataKey="result" />
                <YAxis />
                <Line dataKey="performedAt" />
            </LineChart>
        </div>
    );
}

export { Monitor };