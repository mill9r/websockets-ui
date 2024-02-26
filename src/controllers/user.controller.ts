import { Handler } from '../utils/error.handler';
import { Create, Read } from '../interfaces/crud.interfaces';
import { User, UserCreate } from '../models';
import WebSocket from 'ws';
import { TABLE_PRIMARY_KEYS } from '../constants/db-table.constant';

export const userController = (
  service: Read<string, User> & Create<UserCreate, User>,
  errorChain: Handler,
  ws: WebSocket,
  webSocketService: Read<WebSocket, string> &
    Create<{ ws: WebSocket; userId: string }, boolean>,
) => {
  return async (data: { name: string; password: string }) => {
    try {
      const user = await service.create({
        name: data.name,
        password: data.password,
      });
      await webSocketService.create({
        ws,
        userId: user[TABLE_PRIMARY_KEYS.userId],
      });
      // TODO adjust the return type
      return {
        type: 'reg',
        data: {
          name: user.name,
          index: user[TABLE_PRIMARY_KEYS.userId],
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
