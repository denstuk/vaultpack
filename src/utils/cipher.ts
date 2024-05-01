import crypto from 'node:crypto';
import type { Transform } from 'node:stream';

const ALGORITHM = 'aes-256-ecb';
const KEY_DIGEST = 'sha512';
const KEY_SALT = '356a192b7913b04c54574d18c28d46e6395428ab';

export const createKey = (password: string): Buffer => {
  return crypto.pbkdf2Sync(password, KEY_SALT, 10, 32, KEY_DIGEST);
};

export const createEncryptionStream = (key: Buffer): Transform => {
  return crypto.createCipher(ALGORITHM, key);
};

export const createDecryptionStream = (key: Buffer): Transform => {
  return crypto.createDecipher(ALGORITHM, key);
};
