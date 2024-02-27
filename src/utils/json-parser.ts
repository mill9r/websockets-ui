export function parseNestedJson(json: Buffer | ArrayBuffer | Buffer[]) {
  if (!json) {
    return '';
  }

  const input = JSON.parse(json.toString());
  Object.keys(input).forEach((key) => {
    if (key === 'data' && typeof input[key] == 'string' && input[key].length) {
      input[key] = JSON.parse(input[key]);
    }
  });

  return input;
}

export function stringifyNestedJson<T extends { [key: string]: any }>(json: T) {
  if (!json) {
    return '';
  }

  const input: { [key: string]: any } = { ...json };
  Object.keys(json).forEach((key) => {
    if (key === 'data') {
      input[key] = JSON.stringify(input[key]);
    }
  });

  return JSON.stringify(input);
}
