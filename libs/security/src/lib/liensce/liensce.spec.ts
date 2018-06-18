import * as jwt from 'jsonwebtoken';
import * as crypto from './crypto';
import * as liensce from './liensce';
import { SchoolEncryptedData } from './liensce';

describe('Crypto: Meant for the encrytion Internal', () => {
  it('encrypt: should throw error for invalid options passed', () => {
    [
      undefined,
      null,
      '',
      {},
      { target: 'target', key: 'key' },
      { options: {}, key: 'key' }
    ].forEach(e => {
      // expect(() => {}).
      expect(async () => await crypto.encrypt(e as any)).toThrowError(
        crypto.invalidEncryptParameters.message
      );
    });
  });

  it('encrypt: is should call JWT.Sign and return a Promise', async () => {
    const _valid = { options: {}, target: 'target', key: 'key' };
    const spy = spyOn(jwt, 'sign');
    await crypto.encrypt(_valid);
    expect(spy).toHaveBeenCalled();
  });

  it('decrypt: should throw error for invalid options passed', () => {
    [
      undefined,
      null,
      'ss',
      {},
      { token: 'target', key: 'key' },
      { options: {}, key: 'key' }
    ].forEach(e => {
      expect(async () => await crypto.decrypt(e as any)).toThrowError(
        crypto.invalidDecryptParameters.message
      );
    });
  });

  it('decrypt: is should call JWT.Sign and return a Promise', async () => {
    const _valid = { options: {}, token: 'target', key: 'key' };
    const spy = spyOn(jwt, 'verify');
    await crypto.decrypt(_valid);
    expect(spy).toHaveBeenCalled();
  });
});

describe('Liensce: encrypting and decrypting the student liensce key', () => {
  it('encryptLiensce: it should throw error for invalid argument passed', () => {
    [undefined, null, 's', {}, 8].forEach(e => {
      expect(async () => await liensce.encryptLiensce(e as any)).toThrowError(
        liensce.missingEncryptedSchoolData.message
      );
    });
  });

  it('encryptLiensce; it should call crypto.encrypt', async () => {
    const spy = spyOn(crypto, 'encrypt');
    const _valid: SchoolEncryptedData = {
      apikey: 'apikey',
      // liensceKey: 'liensceKey',
      schoolId: 'schoolId',
      schoolName: 'schoolName',
      timestamp: 'timestamp'
    };
    await liensce.encryptLiensce(_valid);
    expect(spy).toHaveBeenCalled();
  });

  it('decryptLiensce: it should throw error for invalid token', () => {
    [undefined, null, {}, 9].forEach(e => {
      expect(async () => await liensce.decryptLiensce(e as any)).toThrowError(
        liensce.tokenRequired.message
      );
    });
  });
});
