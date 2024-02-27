import { RoomStatusEnum } from '../constants/room-status.enum';
import WebSocket from 'ws';
import { Create, Read, Update } from '../interfaces/crud.interfaces';
import { Room, User, UserCreate } from '../models';
import { roomMapper } from '../utils/room.mapper';

export const roomService = (deps: Update<{
                              roomId: string,
                              status: RoomStatusEnum
                            }, Room> & Read<undefined, any[]>, ws: WebSocket,
                            webSocketService: Read<WebSocket, string> &
                              Create<{ ws: WebSocket; userId: string }, boolean>) => {
  return {
    updateRoom: async (roomId: string) => {
      const userId = await webSocketService.get(ws);
      await deps.update(userId, {
        roomId,
        status: RoomStatusEnum.PLAYING,
      });
      const getRoom = await deps.get(undefined);
      const respData = getRoom.map(roomMapper);
      return {
        type: 'update_room',
        data: respData,
        id: 0,
      };
    },
  };
};
