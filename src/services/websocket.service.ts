import { Create, Read } from '../interfaces/crud.interfaces';
import WebSocket from 'ws';

const wsToUserId = new Map();

export const websocketService = (): Read<WebSocket, string> &
  Create<{ ws: WebSocket; userId: string }, boolean> => {
  return {
    get: async (ws: WebSocket) => {
      return wsToUserId.get(ws);
    },

    create: async (payload: { ws: WebSocket; userId: string }) => {
      if (!wsToUserId.has(payload.ws)) {
        wsToUserId.set(payload.ws, payload.userId);
      }

      return true;
    },
  };
};
