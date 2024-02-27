import { getUserName, isUserExist } from './user-dao.validators';
import {
  DaoUserAlreadyExistError,
  DaoUserNotExistError,
} from '../exceptions/dao.exceptions';
import { User } from '../models';

describe('UserDaoValidators', () => {
  describe('isUserExist', () => {
    it('should throw an error if user does not exist', () => {
      const id = 'id';
      const users = new Map<string, User>();
      expect(() => isUserExist(id, users)).toThrow(DaoUserNotExistError);
    });
    it('should not throw an error if user exists', () => {
      const id = 'id';
      const users = new Map<string, User>([[id, {} as User]]);
      expect(() => isUserExist(id, users)).toBeTruthy();
    });
  });

  describe('isUserNameExist', () => {
    it('should throw an error if name exists', () => {
      const name = 'name';
      const users = new Map<string, User>([['id', { name: 'name' } as User]]);
      expect(() => getUserName(name, users)).toThrow(DaoUserAlreadyExistError);
    });
    it('should not throw an error if name does not exist', () => {
      const name = 'name';
      const users = new Map<string, User>([['id', { name: 'name1' } as User]]);
      expect(() => getUserName(name, users)).toBeTruthy();
    });
  });
});
