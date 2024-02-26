import { User } from '../models';
import {
  DaoInvalidPasswordError,
  DaoUserNotExistError,
} from '../exceptions/dao.exceptions';
import { Database } from '../simple-db/simple-db';
import { DB_TABLE, TABLE_PRIMARY_KEYS } from '../constants/db-table.constant';

const isUserExist = (id: string, users: Map<string, User>) => {
  if (!users.has(id)) {
    throw new DaoUserNotExistError();
  }
};

const getUserName = (
  name: string,
  password: string,
  users: Map<string, User>,
) => {
  const user = Database.getTable(DB_TABLE.users).select(
    (row) => row.name === name,
  ) as unknown as User[];

  if (user[0] && user[0].password !== password) {
    throw new DaoInvalidPasswordError();
  }

  return user[0];
};

const selectUserById = (id: string) => {
  return (
    Database.getTable(DB_TABLE.users).select(
      (row) => row[TABLE_PRIMARY_KEYS.userId] === id,
    ) as unknown as User[]
  )[0];
};

export { isUserExist, getUserName, selectUserById };
