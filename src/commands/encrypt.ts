import crypto from 'node:crypto';
import { createReadStream, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createEncryptionStream, createKey, removeFile, zip } from '../utils';

export type EncryptOptions = {
  readonly password: string;
  readonly folder: string;
  readonly output?: string;
};

export const encrypt = async (options: EncryptOptions): Promise<void> => {
  const { folder, password, output } = options;

  const key = createKey(password);
  const name = output ?? crypto.randomUUID();

  const folderToZipPath = join(process.cwd(), folder);
  const zipPath = join(process.cwd(), `${name}.zip`);
  await zip(folderToZipPath, zipPath);

  const inputStream = createReadStream(zipPath);
  const encryptStream = createEncryptionStream(key);
  const outStream = createWriteStream(name);

  await Promise.all([
    pipeline(inputStream, encryptStream, outStream),
    removeFile(zipPath)
  ]);
};
