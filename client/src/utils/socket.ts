import { Socket, io } from 'socket.io-client';

const ENDPOINT = "http://localhost:4000"

const socketIO: Socket = io(ENDPOINT,{
  autoConnect:false,
});

export default socketIO;