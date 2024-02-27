import { Create, Read, Update } from '../interfaces/crud.interfaces';
import { Room } from '../models';
import WebSocket from 'ws';
import { roomService } from '../services/room.service';
import { roomDao } from '../dao/room.dao';
import { generateUUID } from '../utils/uuid-generator';

export const gameController = (
  service: Create<{ roomId: string; userId: string }, any>,
  ws: WebSocket,
  webSocketService: Read<WebSocket, string> &
    Create<{ ws: WebSocket; userId: string }, boolean>,
) => {
  return async (data: { roomId: string }) => {
    try {
      return {
        createGame: async (data: { roomId: string; userId: string }) => {
          const userId = await webSocketService.get(ws);
          const game = await service.create({
            roomId: data.roomId,
            userId: userId,
          });

          await roomService(
            roomDao(generateUUID),
            ws,
            webSocketService,
          ).updateRoom(data.roomId);

          console.log('game', game);
          return {
            type: 'create_game',
            data: {
              idGame: game[0].roomId,
              idPlayer: game[0].userId,
            },
            id: 0,
          };
        },
      };
    } catch (error: any) {
      console.log('error', error);
    }
  };
};
