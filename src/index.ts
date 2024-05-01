#! /usr/bin/env node

import consola from 'consola';
import { App } from './app';

const main = async (): Promise<void> => App.run();

main().catch((error: unknown) => {
  consola.error(error);
  process.exitCode = 1;
});
