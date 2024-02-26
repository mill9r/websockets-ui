import { isUUIDValid } from '../utils/uuid-generator';
import {
  Create,
  Read,
  ReadByName, ReadBySocket,
  Update,
} from '../interfaces/crud.interfaces';
import { User, UserCreate, UserModel } from '../models';
import {
  DaoInvalidPasswordError,
  DaoUserNotExistError,
} from '../exceptions/dao.exceptions';
import {
  ServiceInvalidPasswordError,
  ServiceUserNotExistException,
} from '../exceptions/service.exceptions';

export const userService = (
  deps: Read<string, User> &
    Create<UserCreate, User> &
    Update<UserCreate, User> &
    ReadByName<UserCreate, User>,
): Read<string, User> & Create<UserCreate, User> => {
  return {
    get: async (id: string) => {
      isUUIDValid(id);
      return deps.get(id).catch((e) => {
        throw e instanceof DaoUserNotExistError
          ? new ServiceUserNotExistException()
          : e;
      });
    },

    create: async (user: UserCreate) => {
      const isUserExist = await deps.getByName(user).catch((e) => {
        throw e instanceof DaoInvalidPasswordError
          ? new ServiceInvalidPasswordError()
          : e;
      });
      if (isUserExist) {
        return isUserExist;
      }
      return deps.create(new UserModel(user).user);
    },
  };
};
