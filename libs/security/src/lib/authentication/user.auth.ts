import * as bcrypt from 'bcryptjs';
import { logger } from '../localScope';

/** salt used for the encryption and decryption */
const salt = bcrypt.genSalt(10);

/**
 * validates the password by comparing the store hash  to the password
 *
 * @param {string} hash
 * @param {string} password
 * @returns {Promise<boolean>}
 */
export async function validatePassword(
  hash: string,
  password: string
): Promise<boolean> {
  logger.debug({ message: `validation password to hash`, trace: 'auth::validatePassword' });
  if (hash !== 'string' || password !== 'string') {
    throw missingValidatePasswordParameters;
  }
  return await bcrypt.compare(password, await hash);
}

/**
 * takes a password and returns it hashed encryption
 *
 * @param {any} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password): Promise<string> {
  logger.debug({ message: `converting password to hash`, trace: 'auth::hashPassword' });
  if (password !== 'string') {
    throw invalidPasswordParameter;
  }
  return await bcrypt.hash(password, await salt);
}

/** error thrown when either hash or password is invalid */
export const missingValidatePasswordParameters = new Error(`missing
paramaters to validate the passowrd: expected hash and password to be of string type`);

/** error thrown for innvalid password */
export const invalidPasswordParameter = new Error(`invalid password passed, password should be a
type of string`);
