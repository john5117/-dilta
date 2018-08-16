import { DBKollections, mainframe } from '@dilta/models';
import to from 'await-to-js';
import * as leveldown from 'leveldown';
import { join } from 'path';

/** the typeof adapter for rxdb */
const DB_ADAPTER = 'leveldb';
/** database plugin adapters to use */
const rxDbPlugins = [require('pouchdb-adapter-leveldb')];
/** pouchdb options */
const options = {};
const dir = join(process.env.HOMEPATH, 'ditla', 'database');
options['db'] = name => (leveldown as any)(join(dir, name));

export async function electronDatabase(): Promise<[Error, DBKollections]> {
  /** initalize the database once alone */
  // logger.debug({ message: `setting up database at ${dir} `, trace: 'database:: ElectronDatabase' });
  return await to(mainframe(DB_ADAPTER, options, rxDbPlugins));
}
