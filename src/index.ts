import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';
import { WebSocketServer } from 'ws';

import dotenv from 'dotenv';
import { parseNestedJson, stringifyNestedJson } from './utils/json-parser';
import { controllerFactory } from './factories/controller.factory';
import { initDb } from './simple-db/init';
import { websocketService } from './services/websocket.service';

const config = dotenv.config({ path: `.env.ws` });
const port = Number(config.parsed?.PORT) || 3000;
initDb();
const wsService = websocketService();

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(''));
  const file_path =
    __dirname + (req.url === '/' ? '/front/index.html' : '/front' + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

const wss = new WebSocketServer({ port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const userCtrl = controllerFactory(ws, wsService).userController;
    const roomCtrl = controllerFactory(ws, wsService).roomController;
    const gameCtrl = controllerFactory(ws, wsService).gameController;

    const msg = parseNestedJson(message);
    console.log(msg);

    if (msg.type == 'reg') {
      userCtrl(msg.data).then((data) => {
        // @ts-ignore
        console.log('sending: %s', stringifyNestedJson(data));
        // @ts-ignore
        ws.send(stringifyNestedJson(data));
      });
      roomCtrl()
        .then((data) => data?.getRooms())
        .then((resp) => {
          // @ts-ignore
          ws.send(stringifyNestedJson(resp));
        });
    }

    if (msg.type == 'create_room') {
      roomCtrl()
        .then((data) => data?.createRoom())
        .then((resp) => {
          if(resp) {
            // TODO guarantee that resp is not null | undefined
            const response = stringifyNestedJson(resp);
            console.log('sending --> : %s', response);
            ws.send(response);
          }
        });
    }

    if(msg.type == 'add_user_to_room') {
      gameCtrl(msg.data.indexRoom)
        .then((data) => data?.createGame({roomId: msg.data.indexRoom, userId: msg.data.indexUser}))
        .then((resp) => {
          // @ts-ignore
          ws.send(stringifyNestedJson(resp));
        });
    }
  });

  ws.on('close', function close() {
    console.log('disconnected');
  });
});
