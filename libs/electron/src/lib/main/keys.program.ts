import { PlatformMetaData } from '@dilta/screwbox';
import { SchoolEncryptedData } from '@dilta/security';
import { to } from 'await-to-js';
import { deletePassword, getPassword, setPassword } from 'keytar';
import { logger } from '@dilta/electron/src/lib/main/localscope';

/** specific platform configuration and metadata */
const platformInfo: PlatformMetaData = {
  accountName: process.env.DILTA || 'dilta',
  platform: 'Electron',
  projectName: 'Trazom'
};

/** the appicaton name on the platform */
export const APPLICATION_NAME = platformInfo.accountName;

/** the school liensce  key account */
export const APPLICATION_SCHOOL_KEY = `${APPLICATION_NAME}:SCHOOL:LIENSCEKEY`;

/**
 * saves the liensce key to open the application and to
 * confirm it's validity
 *
 * @export`
 * @param {SchoolEncryptedData} key encrypted liensce key for the application
 * @returns
 */
export async function saveLiensceKey(
  key: SchoolEncryptedData
): Promise<[Error, SchoolEncryptedData]> {
  try {
    logger.debug({
      message: `saveLiensceKey(key): saving program liensce key to os keystore`,
      trace: 'keys::saveLiensceKey'
    });
    await to(
      setPassword(APPLICATION_NAME, APPLICATION_SCHOOL_KEY, JSON.stringify(key))
    );
    return [null, key];
  } catch (error) {
    return [error, null];
  }
}

export const SavingLiensceKeyError = new Error(
  ' Error while Setting liensce Key '
);

/**
 * retrieves the application liensce key for the application
 *
 * @export
 * @returns
 */
export async function liensceKey() {
  logger.debug({
    message: `retriving the program liensce key`,
    trace: 'keys::liensceKey'
  });
  return <SchoolEncryptedData>JSON.parse(
    await getPassword(APPLICATION_NAME, APPLICATION_SCHOOL_KEY)
  );
}

/**
 * deletes the save liensce key for the application
 *
 * @export
 * @returns
 */
export function deleteLiensceKey() {
  logger.debug({
    message: `deleting the liensceKey from the keystore`,
    trace: 'keys::deleteLiensceKey'
  });
  return deletePassword(APPLICATION_NAME, APPLICATION_SCHOOL_KEY);
}

const APPLICATION_SCHOOL_ID = `${APPLICATION_NAME}:SCHOOL_ID`;

/**
 * saves unique id for the school to track schools to their documents
 *
 * @export
 * @param {string} id the unique school Id to mapped the documents
 * @returns
 */
export async function saveSchoolId(id: string) {
  logger.debug({
    message: `saving the unique school id to the key store`,
    trace: 'keys::saveSchoolId'
  });
  return await setPassword(APPLICATION_NAME, APPLICATION_SCHOOL_ID, id);
}

/**
 * retreives the school unique id to track documents
 *
 * @export
 * @returns
 */
export async function schoolId() {
  logger.debug({
    message: `retrieving the school id from the keystore`,
    trace: 'keys::schoolId'
  });
  return await getPassword(APPLICATION_NAME, APPLICATION_SCHOOL_ID);
}

/**
 * removes the school id used to track documents
 *
 * @export
 * @returns
 */
export function deleteSchoolId() {
  logger.debug({
    message: `removing the school id from the keystore`,
    trace: 'keys::deleteSchoolId'
  });
  return deletePassword(APPLICATION_NAME, APPLICATION_SCHOOL_ID);
}

// TODO: better error validation for expected operations
/** error displayed if the liensce is not found in the database */
export const keyNotFoundError = new Error(
  `liensce key for the application not found`
);
