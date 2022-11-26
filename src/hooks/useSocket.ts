import { useEffect, useRef } from 'react';
import { BASE_URL } from 'constants/constants';
import io, { ManagerOptions, Socket, SocketOptions } from 'socket.io-client';

export const useSocket = (
  url: string = BASE_URL,
  options: Partial<ManagerOptions & SocketOptions> = { autoConnect: false }
): Socket => {
  const { current: socket } = useRef(io(url, options));

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return socket;
};
