import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createDecryptionStream, createKey } from '../utils';

export type DecryptOptions = {
  readonly password: string;
  readonly file: string;
};

export const decrypt = async (options: DecryptOptions): Promise<void> => {
  const { file, password } = options;

  const key = createKey(password);

  const inputStream = createReadStream(file);
  const decryptStream = createDecryptionStream(key);
  const outStream = createWriteStream(`${file}.zip`);

  return await pipeline(inputStream, decryptStream, outStream);
};
