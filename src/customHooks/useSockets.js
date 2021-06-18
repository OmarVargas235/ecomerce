import { useState, useEffect, useMemo } from 'react';
import io from "socket.io-client";

export const useSocket = ( serverPath ) => {

	const token = localStorage.getItem('token');
	
	const socket = useMemo( () => ( io.connect(serverPath, {
		transports: ['websocket'],
		query: {
            'x-token': token
        }
	})
	), [serverPath, token] );

	const [online, setOnline] = useState( false );

	useEffect(() => {
		
        setOnline(socket.connected);
        socket.on('connect', () => setOnline(true));
        socket.on('disconnect', () => setOnline(false));

    }, [socket]);

	return [
		socket,
		online,
	];
}