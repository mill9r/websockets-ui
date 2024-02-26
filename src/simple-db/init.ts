import { Database } from './simple-db';
import { DB_TABLE } from '../constants/db-table.constant';

export const initDb = () => {
  Database.createTable(DB_TABLE.users);
  Database.createTable(DB_TABLE.room);
  Database.createTable(DB_TABLE.roomUser);
  Database.createTable(DB_TABLE.winners);
};
