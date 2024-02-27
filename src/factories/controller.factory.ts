import { userController } from '../controllers/user.controller';
import { userService } from '../services/user.service';
import { userDao } from '../dao/user.dao';
import { generateUUID } from '../utils/uuid-generator';
import { createChain } from '../utils/error.handler';
import { handleWrongPassword } from '../utils/user-error.handler';
import WebSocket from 'ws';
import { roomController } from '../controllers/room.controller';
import { roomDao } from '../dao/room.dao';
import { websocketService } from '../services/websocket.service';
import { Create, Read } from '../interfaces/crud.interfaces';
import { gameController } from '../controllers/game.controller';
import { gameDao } from '../dao/game.dao';

export const controllerFactory = (
  ws: WebSocket,
  webSocketService: Read<WebSocket, string> &
    Create<{ ws: WebSocket; userId: string }, boolean>,
) => ({
  userController: userController(
    userService(userDao(generateUUID)),
    createChain(handleWrongPassword),
    ws,
    webSocketService,
  ),
  roomController: roomController(roomDao(generateUUID), ws, webSocketService),
  gameController: gameController(gameDao(generateUUID), ws, webSocketService),
});
