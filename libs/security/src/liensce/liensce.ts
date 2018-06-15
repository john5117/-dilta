import { decrypt, encrypt } from './crypto';
import * as fs from 'fs';
import * as promisify from 'util.promisify';
import { throwError } from '@dilta/screwbox';
import { to } from 'await-to-js';

/**
 * interface for the encrypted data in the database
 *
 * @export
 * @interface SchoolEncryptedData
 */
export interface SchoolEncryptedData {
  /**
   * the private apikey for the school online's connections
   *
   * @type {string}
   * @memberof SchoolEncryptedData
   */
  apikey: string;
  /**
   * the global unique school id
   *
   * @type {string}
   * @memberof SchoolEncryptedData
   */
  globalId: string;
  /**
   * the unique schoolId
   *
   * @type {string}
   * @memberof SchoolEncryptedData
   */
  schoolId: string;
  /**
   * the school name which the program is used
   *
   * @type {string}
   * @memberof SchoolEncryptedData
   */
  schoolName: string;
  /**
   * the time starts for the expiring of the liensce
   *
   * @type {(string | number)}
   * @memberof SchoolEncryptedData
   */
  timestamp: string | number;
}

/**
 * method used for encryting and create a new liensce key
 *
 * @export
 * @param {SchoolEncryptedData} target the item to encrypt
 * @returns
 */
export function encryptLiensce(target: SchoolEncryptedData) {
  if (typeof target !== 'object') {
    throw missingEncryptedSchoolData;
  }
  return encrypt(target);
}

/**
 * decrypts and retrieves original encrypted liensce
 *
 * @export
 * @param {string} token jwt token used for decryption
 * @returns
 */
export function decryptLiensce(token: string): SchoolEncryptedData {
  if (typeof token !== 'string') {
    throw tokenRequired;
  }
  return decrypt<SchoolEncryptedData>(token) as any;
}

/** error thrown for missing Encrypted School Data */
export const missingEncryptedSchoolData = new Error(`missing school data [object] to
be encrypted into the liensce key`);

/** error thrown when token key is missing or invalid */
export const tokenRequired = new Error(`liensce encrypted string token is
required for decrypting liensce key`);

// const l = console.log;
// l(encryptLiensce({
//   apikey: 'apikey', globalId: '123random5xyz',
//   schoolId: 'schoolId', schoolName: 'testing school', timestamp: '06-07-17'
// }));
