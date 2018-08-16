import * as CONSTANTS from '@dilta/electron/src/lib/main/constants.ipc';
// tslint:disable-next-line:max-line-length
import { deleteLiensceKey, deleteSchoolId, liensceKey, saveLiensceKey, saveSchoolId, schoolId } from '@dilta/electron/src/lib/main/keys.program';
import { logger } from '@dilta/electron/src/lib/main/localscope';
import { decryptLiensce, SchoolEncryptedData } from '@dilta/security';
import { to } from 'await-to-js';
import { ipcMain, ipcRenderer } from 'electron';
import { electronDatabase } from './database';

/**
 * event object interface of IPCS
 *
 * @interface IpcEvent
 */
interface IpcEvent {
  /**
   * the reference type to the event sourec
   *
   * @type {typeof ipcRenderer}
   * @memberof IpcEvent
   */
  sender: typeof ipcRenderer;
}

/**
 * appends custom database events to the electron process
 *
 * @export
 * @param {typeof ipc} ipcMain
 */
export async function mainframeIPC(ipc: typeof ipcMain) {
  global['_databaseInit'] = await electronDatabase();

  logger.debug({
    message: `setting up IPC Events Bindings`,
    trace: 'mainframe::mainframeIPC'
  });
  // ipc events for DATABASE
  // ipc event for sending the database
  ipc.on(CONSTANTS.GET_DATABASE, async (event: IpcEvent) => {
    event.sender.send(CONSTANTS.RETRIEVED_DATABASE, global['_databaseInit']);
  });

  // ipc main events for lienscekey
  // for getting the liensce key
  ipc.on(CONSTANTS.GET_LIENSCE_KEY, async (event: IpcEvent) => {
    event.sender.send(CONSTANTS.RETRIEVED_LIENSCE_kEY, await to(liensceKey()));
  });
  // for saving liensce key
  ipc.on(
    CONSTANTS.SET_LIENSCE_KEY,
    async (event: IpcEvent, key: SchoolEncryptedData) => {
      event.sender.send(CONSTANTS.SAVED_LIENSCE_KEY, await saveLiensceKey(key));
    }
  );
  // for deleting the liensce key returns promisfied boolean
  ipc.on(CONSTANTS.DELETE_LIENSCE_KEY, async (event: IpcEvent) => {
    event.sender.send(CONSTANTS.DELETED_LIENSCE_KEY, await deleteLiensceKey());
  });

  // ipc main events for lienscekey
  // for getting the liensce key
  ipc.on(CONSTANTS.GET_SCHOOL_ID, async (event: IpcEvent) => {
    event.sender.send(CONSTANTS.RETRIEVED_LIENSCE_kEY, await to(schoolId()));
  });
  // for getting the liensce key
  ipc.on(
    CONSTANTS.SET_SCHOOL_ID,
    async (event: IpcEvent, { id }: { id: string }) => {
      event.sender.send(CONSTANTS.SAVED_SCHOOL_ID, await to(saveSchoolId(id)));
    }
  );
  // for getting the liensce key
  ipc.on(CONSTANTS.DELETE_SCHOOL_ID, async (event: IpcEvent) => {
    event.sender.send(CONSTANTS.DELETE_SCHOOL_ID, await deleteSchoolId());
  });

  // verifying liensce key file
  ipc.on(
    CONSTANTS.VERIFY_LIENSCE_KEY_FILE,
    async (event: IpcEvent, { token }: { token: string }) => {
      event.sender.send(
        CONSTANTS.VERIFYED_LIENSCE_KEY_FILE,
        await to(decryptLiensceAsync(token))
      );
    }
  );
}

function decryptLiensceAsync(token) {
  return new Promise((resolve, reject) => {
    try {
      resolve(decryptLiensce(token));
    } catch (error) {
      const { stack, name, message }: Error = error;
      reject({ stack: error.stack.toString(), name, message });
    }
  });
}
