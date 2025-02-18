import { useEffect } from 'react';
import socket from '../utils/socket';
const useSocket = () => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
      socket.off();
    };
  },[]);
};

export default useSocket;