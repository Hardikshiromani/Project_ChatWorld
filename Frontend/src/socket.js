import {io} from 'socket.io-client';

 const socket = io('http://localhost:5000', {
    transports: ["websocket"], // Optional, for better real-time
});

export default socket;
