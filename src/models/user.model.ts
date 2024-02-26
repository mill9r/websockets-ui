import { ServiceInvalidUserException } from '../exceptions/service.exceptions';
import { TABLE_PRIMARY_KEYS } from '../constants/db-table.constant';

export interface UserCreate {
  name: string;
  password: string;
}

export interface User extends UserCreate {
  [TABLE_PRIMARY_KEYS.userId]: string;
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
