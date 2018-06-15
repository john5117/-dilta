import * as bcrypt from 'bcryptjs';
import * as auth from './user.auth';

describe('Auth: SignUp and Login Authentication', () => {
  const _testVals = [undefined, null, 8, {}];

  it('validatePassword: should throw error for invalid parameters', () => {
    //  creating 2D array of test values
    _testVals.forEach(hash => {
      _testVals.forEach(password => {
        expect(
          async () => await auth.validatePassword(hash as any, password as any)
        ).toThrowError(auth.missingValidatePasswordParameters.message);
      });
    });
  });

  it('validatePassword: expected bcrypt.comppare to be called', () => {
    const spy = spyOn(bcrypt, 'compare');
    auth.validatePassword('s', 's');
  });

  it(`hashPassword: it should throw error for invalid parameter passed`, () => {
    _testVals.forEach(e => {
      expect(async () => await auth.hashPassword(e));
    });
  });

  it(`hashPassword: it should call bcrypt.hash method`, () => {
    const spy = spyOn(bcrypt, 'hash');
    auth.hashPassword('passkey');
    expect(spy).toHaveBeenCalled();
  });
});
