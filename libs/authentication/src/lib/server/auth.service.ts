import { AUDIENCE, BCRYPT_HASH_ROUND, ENCRYPTION_KEY, JWT_ALGORITHM } from '@dilta/authentication/src/lib/server/constants';
import { AuthService } from '@dilta/embededdb';
import { Auth } from '@dilta/models';
import { throwError } from '@dilta/screwbox';
import { Injectable } from '@nestjs/common';
import { to } from 'await-to-js';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

const JWT_OPTIONS = {
  audience: AUDIENCE,
  issuer: AUDIENCE
};

@Injectable()
export class ClientAuthService {
  constructor(public auth: AuthService) {}

  /** saves the user authentication */
  async save(auth: Auth) {
    let err: Error;
    let password: string;
    [err, password] = await to(this.createHash(auth.password));
    throwError(err);
    auth.password = password;
    [err, auth] = await to(this.auth.create$(auth));
    throwError(err);
    return this.auth.santizeAuth(auth);
  }

  /** create hash for the password */
  async createHash(password: string) {
    const [err, hashes] = await to(hash(password, BCRYPT_HASH_ROUND));
    throwError(err);
    return hashes;
  }

  /** validates the user password */
  async checkPassword(password: string, hashed: string) {
    const [err, isValid] = await to(compare(password, hashed));
    throwError(err);
    return isValid;
  }

  /** creates token for the user */
  async createToken(auth: Auth) {
    return new Promise((resolve, reject) => {
      sign(
        this.auth.santizeAuth(auth),
        ENCRYPTION_KEY,
        {
          algorithm: JWT_ALGORITHM,
          expiresIn: '7d',
          ...JWT_OPTIONS
        },
        (err, token) => {
          if (err) {
            return reject(err);
          }
          resolve(token);
        }
      );
    });
  }

  /** decodes the token to vaild Auth Object */
  decryptToken(token: string) {
    return new Promise((resolve, reject) => {
      verify(
        token,
        ENCRYPTION_KEY,
        {
          algorithms: JWT_ALGORITHM,
          ignoreExpiration: false,
          ...JWT_OPTIONS
        } as any,
        (err, value) => {
          if (err) {
            return reject(err);
          }
          resolve((value as any) as Partial<Auth>);
        }
      );
    });
  }

  async validate(payload: string) {}
}
