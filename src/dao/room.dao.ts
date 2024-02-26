import { Create, Read, Update } from '../interfaces/crud.interfaces';
import { Room } from '../models';
import { Database } from '../simple-db/simple-db';
import { DB_TABLE, TABLE_PRIMARY_KEYS } from '../constants/db-table.constant';
import { RoomStatusEnum } from '../constants/room-status.enum';
import * as console from 'console';

export const roomDao = (
  generator: () => string,
): Create<string, Room> & Read<undefined, any[]> & Update<string, Room> => {
  const roomTable = Database.getTable(DB_TABLE.room);
  const roomUserTable = Database.getTable(DB_TABLE.roomUser);
  return {
    create: async (name: string) => {
      const id = generator();
      roomTable.insert({
        [TABLE_PRIMARY_KEYS.roomId]: id,
        roomName: name,
        status: RoomStatusEnum.WAITING,
      });
      return roomTable.select(
        (row) => row[TABLE_PRIMARY_KEYS.roomId] === id,
      )[0] as Room;
    },

    update: async (userId: string, roomId: string) => {
      roomUserTable.insert({ userId, roomId });
      return roomTable.select(
        (row) => row[TABLE_PRIMARY_KEYS.roomId] === roomId,
      )[0] as Room;
    },

    get: async () => {
      Database.tables.forEach((table) => console.log(table));
      return Database.innerJoin(
        [DB_TABLE.room, DB_TABLE.roomUser, DB_TABLE.users],
        [TABLE_PRIMARY_KEYS.roomId, TABLE_PRIMARY_KEYS.userId],
      );
    },
  };
};
