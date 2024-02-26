import { Create, Read } from '../interfaces/crud.interfaces';
import { Room } from '../models';
import { Database } from '../simple-db/simple-db';
import { DB_TABLE } from '../constants/db-table.constant';

export const roomDao = (generator: () => string): Create<string, Room> & Read<string, Room> => {
  const roomTable = Database.getTable(DB_TABLE.room);
  const roomUserTable = Database.getTable(DB_TABLE.roomUser);
  return {
    create: async (name: string) => {
      const id = generator();
      roomTable.insert({ id, name });
      return roomTable.select((row) => row.id === id)[0] as Room;
    },

    // update: async (id: string, name: string) => {
    //   roomTable.update((row) => row.id === id, { name });
    //   return roomTable.select((row) => row.id === id)[0] as Room;
    // },

    get: async (id: string) => {
      return roomTable.select((row) => row.id === id)[0] as Room;
    },
  };
};
