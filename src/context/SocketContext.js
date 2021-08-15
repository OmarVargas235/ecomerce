import React from 'react';
import { createContext } from 'react';
import { useSocket } from '../customHooks/useSockets';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {

	const [ socket, online ] = useSocket( process.env.REACT_APP_BACKEND_URL );
	
	return (
		<SocketContext.Provider value={{
			socket,
			online,
		}}>
			{ children }	
		</SocketContext.Provider>	
	)
}

export default SocketProvider;