import { DBKollections, mainframe } from '@dilta/models';
import to from 'await-to-js';
// import * as leveldown from 'leveldown';
import { join } from 'path';
import { logger } from './localscope';



const { debug } = logger;
/** the typeof adapter for rxdb */
// const DB_ADAPTER = 'leveldb';
const DB_ADAPTER = 'memory';
/** database plugin adapters to use */
// const rxDbPlugins = [require('pouchdb-adapter-leveldb')];
const rxDbPlugins = [require('pouchdb-adapter-memory')];
/** pouchdb options */
const options = {};


export default async function ElectronDatabase(): Promise<[Error, DBKollections]> {
  /** initalize the database once alone */
  const dir = join(__dirname, 'db');
  debug({ message: `setting up database at ${dir} `, trace: 'database:: ElectronDatabase' });
  // options['db'] = name => leveldown(dir);
  return await to(
    mainframe(DB_ADAPTER, options, rxDbPlugins)
  );
}
