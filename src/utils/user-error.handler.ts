import { Handler } from './error.handler';
import WebSocket from 'ws';
import { ServiceInvalidPasswordError } from '../exceptions/service.exceptions';
import { SERVICE_INVALID_PASSWORD } from '../constants/exceptions.constant';
import { stringifyNestedJson } from './json-parser';

const errorResponse = {
  type: 'reg',
  data: {
    name: '',
    index: '',
    error: true,
    errorText: SERVICE_INVALID_PASSWORD,
  },
  id: 0,
};

export const handleWrongPassword: Handler = (
  error: Error,
  ws: WebSocket,
  id: string,
  next,
) => {
  if (error instanceof ServiceInvalidPasswordError) {
    ws.send(stringifyNestedJson(errorResponse));
  } else if (next) {
    next(error, ws, id, null);
  }
};
