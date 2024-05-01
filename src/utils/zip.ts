import archiver from 'archiver';
import { createWriteStream } from 'node:fs';

export const zip = async (directoryPath: string, outputPath: string): Promise<void> => {
  const output = createWriteStream(outputPath);
  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(output);

  archive.directory(directoryPath, false);
  await archive.finalize();
};
