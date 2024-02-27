import { TABLE_PRIMARY_KEYS } from '../constants/db-table.constant';
import { RoomStatusEnum } from '../constants/room-status.enum';

export interface Room {
  [TABLE_PRIMARY_KEYS.roomId]: string;
  roomName: string;
  status: RoomStatusEnum;
}
