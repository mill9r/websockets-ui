import { Create, Delete, Read, Update } from '../interfaces/crud.interfaces';
import { Room } from '../models';
import WebSocket from 'ws';
import { generateUUID } from '../utils/uuid-generator';
import { TABLE_PRIMARY_KEYS } from '../constants/db-table.constant';
import { RoomStatusEnum } from '../constants/room-status.enum';
import { roomMapper } from '../utils/room.mapper';

export const roomController = (
  service: Create<string, Room> & Read<undefined, any[]> & Update<{
    roomId: string,
    status: RoomStatusEnum
  },Room>,
  ws: WebSocket,
  webSocketService: Read<WebSocket, string> &
    Create<{ ws: WebSocket; userId: string }, boolean>
) => {
  return async () => {
    try {
      return {
        createRoom: async () => {
          const room = await service.create(generateUUID());
          const userId = await webSocketService.get(ws);
          const updateRoom = await service.update(
            userId,
            {
              roomId: room[TABLE_PRIMARY_KEYS.roomId],
              status: RoomStatusEnum.WAITING,
            }
          );
          const getRoom = await service.get(undefined);
          const respData = getRoom.map(roomMapper);
          return {
            type: 'update_room',
            data: respData,
            id: 0,
          };
        },

        getRooms: async () => {
          const getRoom = await service.get(undefined);
          console.log('getRoom', getRoom);
          const respData = getRoom.map(roomMapper);
          return {
            type: 'update_room',
            data: respData,
            id: 0,
          };
        },
      };
    } catch (error: any) {
      console.log('error', error);
    }
  };
};
