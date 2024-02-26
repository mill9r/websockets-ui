import { ServiceInvalidUserException } from '../exceptions/service.exceptions';
import WebSocket from 'ws';

export interface UserCreate {
  name: string;
  password: string;
}

export interface User extends UserCreate {
  id: string;
}

export class UserModel {
  private createdUser: UserCreate;

  constructor(user: UserCreate) {
    if (!user.name || !user.password) {
      throw new ServiceInvalidUserException();
    }
    this.createdUser = { ...user };

  }

  get user() {
    return this.createdUser;
  }
}
