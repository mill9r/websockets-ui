import { Create, Read, Update } from '../interfaces/crud.interfaces';
import { Room } from '../models';
import WebSocket from 'ws';
import { generateUUID } from '../utils/uuid-generator';
import { TABLE_PRIMARY_KEYS } from '../constants/db-table.constant';

const roomMapper = (room: any) => {
  return {
    roomId: room.roomId,
    roomUsers: [
      JSON.stringify({
        name: room.name,
        index: room.userId,
      }),
    ],
  };
};

export const roomController = (
  service: Create<string, Room> & Read<undefined, any[]> & Update<string, Room>,
  ws: WebSocket,
  webSocketService: Read<WebSocket, string> &
    Create<{ ws: WebSocket; userId: string }, boolean>,
) => {
  return async () => {
    try {
      return {
        createRoom: async () => {
          const room = await service.create(generateUUID());
          const userId = await webSocketService.get(ws);
          const updateRoom = await service.update(
            userId,
            room[TABLE_PRIMARY_KEYS.roomId],
          );
          const getRoom = await service.get(undefined);
          const respData = getRoom.map(roomMapper);
          return {
            type: 'update_room',
            data: JSON.stringify(respData),
            id: 0,
          };
        },

        getRooms: async () => {
          const getRoom = await service.get(undefined);
          const respData = getRoom.map(roomMapper);
          return {
            type: 'update_room',
            data: JSON.stringify(respData),
            id: 0,
          };
        },
      };
    } catch (error: any) {
      console.log('error', error);
    }
  };
};
