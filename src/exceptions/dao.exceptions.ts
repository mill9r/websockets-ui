import {
  DAO_INVALID_PASSWORD,
  DAO_USER_ALREADY_EXIST,
  DAO_USER_NOT_EXIST,
} from '../constants/exceptions.constant';

export class DaoUserNotExistError extends Error {
  constructor(message = DAO_USER_NOT_EXIST) {
    super(message);
    this.name = 'DaoUserNotExistError';
  }
}

export class DaoUserAlreadyExistError extends Error {
  constructor(message = DAO_USER_ALREADY_EXIST) {
    super(message);
    this.name = 'DaoUserAlreadyExistError';
  }
}

export class DaoInvalidPasswordError extends Error {
  constructor(message = DAO_INVALID_PASSWORD) {
    super(message);
    this.name = 'DaoInvalidPasswordError';
  }
}
