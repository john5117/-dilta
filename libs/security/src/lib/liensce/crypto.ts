require('dotenv').config();
import { LiensceGenerator } from '@dilta/security/src/lib/scripts/liensce';

/** private key for liensce encryption  */

/** public key for liensce encryption */

/**
 * encrypts the liensce key for a liensce key
 *
 * @export
 * @returns
 */
export function encrypt(target: any): string {
  if (typeof target !== 'string') {
    target = JSON.stringify(target);
  }
  return LiensceGenerator.privateEncrypt(target);
}

/**
 * decrypts the liensce key back to the original payload
 * note that it returns undefined for failed operation
 *
 * @export
 * @template T
 * @returns
 */
export function decrypt<T>(token: string) {
  const decrypted = LiensceGenerator.publicDecrypt(token);
  try {
    return JSON.parse(decrypted) as T;
  } catch (e) {
    return decrypted as string;
  }
}
