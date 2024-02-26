import { UUID_PATTERN } from '../constants/uuid-pattern.constant';
import { ServiceUuidIsInvalidException } from '../exceptions/service.exceptions';
import { INVALID_UUID } from '../constants/exceptions.constant';

export const generateUUID = () => {
  return `${Math.floor(10000 + Math.random() * 90000)}`;
};

export const isUUIDValid = (uuid: string) => {
  const uuidRegex = new RegExp(UUID_PATTERN);

  if (uuidRegex.test(uuid)) {
    return true;
  }

  throw new ServiceUuidIsInvalidException(INVALID_UUID);
};
