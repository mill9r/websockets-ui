import { Database, Table } from '../simple-db/simple-db';
import { DB_TABLE, TABLE_PRIMARY_KEYS } from '../constants/db-table.constant';
import { Create } from '../interfaces/crud.interfaces';
import { of } from '../utils/async-wrapper';

export const gameDao = ( generator: () => string): Create<{roomId: string, userId: string}, any> => {
  const gameTable = Database.getTable(DB_TABLE.game);
  const userGameTable = Database.getTable(DB_TABLE.userGame);
  return {
    create: (payload: {roomId: string, userId: string}) => {
      const gameId = generator();
      gameTable.insert({ gameId, roomId: payload.roomId });
      userGameTable.insert({ gameId, userId: payload.userId });
      return of(Database.innerJoin(
        [DB_TABLE.game, DB_TABLE.userGame,DB_TABLE.users],
        [TABLE_PRIMARY_KEYS.gameId, TABLE_PRIMARY_KEYS.userId],
      ));
    }
  }
}
