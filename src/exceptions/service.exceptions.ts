import {
  INVALID_USER,
  INVALID_UUID,
  SERVICE_INVALID_PASSWORD,
  SERVICE_USER_NOT_EXIST,
} from '../constants/exceptions.constant';

export class ServiceUuidIsInvalidException extends Error {
  constructor(message = INVALID_UUID) {
    super(message);
    this.name = 'ServiceUuidIsInvalidException';
  }
}

export class ServiceInvalidUserException extends Error {
  constructor(message = INVALID_USER) {
    super(message);
    this.name = 'ServiceInvalidUserException';
  }
}

export class ServiceUserNotExistException extends Error {
  constructor(message = SERVICE_USER_NOT_EXIST) {
    super(message);
    this.name = 'ServiceUserNotExistException';
  }
}

export class ServiceInvalidPasswordError extends Error {
  constructor(message = SERVICE_INVALID_PASSWORD) {
    super(message);
    this.name = 'ServiceInvalidPasswordError';
  }
}
