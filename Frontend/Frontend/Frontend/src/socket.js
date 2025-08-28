import {io} from 'socket.io-client';
const BackURL=import.meta.env.VITE_API_URL;

 const socket = io(`${BackURL}`, {
    transports: ["websocket"], // Optional, for better real-time
});

export default socket;
