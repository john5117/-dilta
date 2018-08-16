import { Auth } from '@dilta/models';

/** redacts to protect user fields */
export const protectAuthDetails = (authId: Auth) => {
  if (!authId) {
    return authId;
  }
  const { hash, updatedAt, password, ...allowed } = authId;
  return allowed;
};

/** get nested id for an object  */
export function nestedId<T>(doc: T, key: keyof T): string {
  return ( typeof doc[key] === 'string' ) ? doc[key] : (doc[key] as any).id;
}
