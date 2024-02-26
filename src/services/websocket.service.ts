import { Create, Read } from '../interfaces/crud.interfaces';
import WebSocket from 'ws';

const wsToUserId = new WeakMap();

export const websocketService = ():
    Read<WebSocket, string> & Create<WebSocket, boolean> => {
    return {
      get: async (ws: WebSocket) => {
        return wsToUserId.get(ws);
      },

      create: async (ws: WebSocket) => {
        wsToUserId.set(ws, true);
        return true;
      },
    };
  }
;

