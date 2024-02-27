import { RoomStatusEnum } from '../constants/room-status.enum';

export const roomMapper = (room: any) => {
  console.log(roomMapper);
  if (room.status === RoomStatusEnum.WAITING) {
    return {
      roomId: room.roomId,
      roomUsers: [
        {
          name: room.name,
          index: room.userId,
        },
      ],
    };
  }
  return {};
};
