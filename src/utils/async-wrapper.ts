export const of = <T>(value: T) => new Promise<T>((resolve) => resolve(value));
