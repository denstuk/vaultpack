import fs from 'node:fs/promises';

/**
 * Throws an error if the specified directory or file does not exist.
 * @throws {Error} if the directory or file does not exist.
 */
export const throwIfNoExists = async (path: string): Promise<void> => {
  try {
    await fs.access(path);
  } catch (error) {
    throw new Error(`Unable to access directory or file: '${path}'`);
  }
};

/**
 * Removes a directory at the specified path.
 * @throws {Error} if the directory does not exist.
 */
export const removeDirectory = async (path: string): Promise<void> => {
  await throwIfNoExists(path);
  return await fs.rmdir(path);
};

/**
 * Removes a file at the specified path.
 * @throws {Error} if the file does not exist.
 */
export const removeFile = async (path: string): Promise<void> => {
  await throwIfNoExists(path);
  return await fs.rm(path);
};
