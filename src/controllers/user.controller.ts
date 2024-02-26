import { Handler } from '../utils/error.handler';
import { Create, Read } from '../interfaces/crud.interfaces';
import { User, UserCreate } from '../models';
import WebSocket from 'ws';

export const userController = (
  service: Read<string, User> & Create<UserCreate, User>,
  errorChain: Handler,
  ws: WebSocket,
) => {
  return async (data: { name: string; password: string }) => {
    try {

      const user = await service.create({ name: data.name, password: data.password });
      console.log('data', user);
      // TODO adjust the return type
      return {
        type: 'reg',
        data: {
          name: user.name,
          index: user.id,
          error: false,
          errorText: '',
        },
        id: 0,
      };
    } catch (error: any) {
      errorChain(error, ws, ``, null);
    }
  };
};
