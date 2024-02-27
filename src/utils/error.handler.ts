import WebSocket from 'ws';

export type Handler = (
  error: Error,
  res: WebSocket,
  id: string,
  next: Handler | null,
) => void;

export const createChain = (...handlers: Handler[]): Handler => {
  return (error, ws: WebSocket, id, _) => {
    const [firstHandler, ...remainingHandlers] = handlers;
    let nextHandler: Handler | null = null;

    if (remainingHandlers.length > 0) {
      nextHandler = createChain(...remainingHandlers);
    }

    if (firstHandler) {
      firstHandler(error, ws, id, nextHandler);
    }
  };
};
