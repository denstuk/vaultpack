import consola from 'consola';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import type { DecryptOptions, EncryptOptions } from './commands';
import { decrypt, encrypt } from './commands';

export class App {
  static async run(): Promise<void> {
    const argv = await App.argv.parse();

    if (argv._.includes('pack')) {
      const { password, folder, output } = argv;
      await encrypt({ folder, password, output } as EncryptOptions);
      consola.success('Packed');
      return;
    }

    if (argv._.includes('unpack')) {
      const { password, file, output } = argv;
      await decrypt({ file, password, output } as DecryptOptions);
      consola.success('Unpacked');
      return;
    }

    throw new Error('Unknown command');
  }

  private static get argv(): yargs.Argv {
    return yargs(hideBin(process.argv))
      .scriptName('vp')
      .command('pack', 'Pack', (y) =>
        y.option('folder', { alias: 'f', type: 'string', description: 'Folder to pack', requiresArg: true }),
      )
      .command('unpack', 'Unpack', (y) =>
        y.option('file', { alias: 'f', type: 'string', description: 'File to unpack', requiresArg: true }),
      )
      .demandCommand(1, 'You need at least one command before moving on')
      .option('password', { alias: 'pass', describe: 'Password for the decryption', type: 'string', requiresArg: true })
      .option('output', { alias: 'o', type: 'string', description: 'Output file', requiresArg: true })
      .help()
      .alias('help', 'h');
  }
}
