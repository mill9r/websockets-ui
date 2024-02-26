import { userController } from '../controllers/user.controller';
import { userService } from '../services/user.service';
import { userDao } from '../dao/user.dao';
import { generateUUID } from '../utils/uuid-generator';
import { createChain } from '../utils/error.handler';
import { handleWrongPassword } from '../utils/user-error.handler';
import WebSocket from 'ws';

export const controllerFactory = (ws: WebSocket) => ({
  userController: userController(
    userService(userDao(generateUUID)),
    createChain(handleWrongPassword),
    ws,
  ),
});
