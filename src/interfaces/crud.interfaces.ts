import WebSocket from 'ws';

export interface Create<T, R> {
  create: (payload: T) => Promise<R>;
}

export interface Update<T, R> {
  update: (id: string, payload: T) => Promise<R>;
}

// @ts-ignore
export interface Read<T, R> {
  get: (id: T) => Promise<R>;
}

export interface ReadByName<T, R> {
  getByName: (payload: T) => Promise<R>;
}

export interface ReadBySocket<R> {
  getBySocket: (socket: WebSocket) => Promise<R>;
}

export interface Delete {
  delete: (id: string) => Promise<boolean>;
}
