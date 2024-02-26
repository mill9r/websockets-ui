import { User, UserCreate } from '../models';
import { getUserName, selectUserById } from './user-dao.validators';
import { of } from '../utils/async-wrapper';
import {
  Create,
  Read,
  ReadByName,
  Update,
} from '../interfaces/crud.interfaces';
import { DaoUserNotExistError } from '../exceptions/dao.exceptions';
import { Database } from '../simple-db/simple-db';
import { DB_TABLE } from '../constants/db-table.constant';

const users = new Map<string, User>();

export function userDao(
  generator: () => string,
): Read<string, User> &
  Create<UserCreate, User> &
  Update<UserCreate, User> &
  ReadByName<UserCreate, User> {
  const userTable = Database.getTable(DB_TABLE.users);
  return {
    get: async (id: string) => {
      const user = selectUserById(id);
      if (!user) {
        throw new DaoUserNotExistError();
      }
      return of(user);
    },
    getByName: async (payload) => {
      const user = getUserName(payload.name, payload.password, users);
      return of(user as User);
    },
    create: async (user: UserCreate) => {
      const generatedId = generator();
      userTable.insert({ id: generatedId, ...user });
      return of(selectUserById(generatedId));
    },
    update: async (id: string, user: UserCreate) => {
      userTable.update(row => row.id === id, { ...user });
      return of(selectUserById(id));
    },
  };
}
