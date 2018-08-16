import { SchoolEncryptedData } from '@dilta/security';
import { Action } from '@ngrx/store';
/**
 * ngrx actions for getting the ProcessStoreEvents liensce key and school id
 *
 * @export
 * @enum {number}
 */
export enum ProcessStoreEvents {
  GET_APIKEY_KEY = '[IPC]::[EMIT]::[APIKEY]::[GET]',
  UPDATE_APIKEY_KEY = '[IPC]::[EMIT]::[APIKEY]::[UPDATE]',
  DELETE_APIKEY_KEY = '[IPC]::[EMIT]::[APIKEY]::[DELETE]',
  SAVE_APIKEY_KEY = '[IPC]::[EMIT]::[APIKEY]::[SAVE]',
  RETRIEVE_APIKEY_KEY = '[IPC]::[EMIT]::[APIKEY]::[RETRIEVE]',
  APIKEY_KEY_ERROR = '[IPC]::[EMIT]::[APIKEY]::[ERROR]',
  GET_LIENSCE_KEY = '[IPC]::[EMIT]::[LIENSCE]::[GET]',
  UPDATE_LIENSCE_KEY = '[IPC]::[EMIT]::[LIENSCE]::[UPDATE]',
  DELETE_LIENSCE_KEY = '[IPC]::[EMIT]::[LIENSCE]::[DELETE]',
  RETRIEVE_LIENSCE_KEY = '[IPC]::[EMIT]::[LIENSCE]::[RETRIEVE]',
  VERITY_LIENSCE_KEY = '[IPC]::[EMIT]::[LIENSCE]::[VERITY]',
  VERIFIED_LIENSCE_KEY_SUCCESS = '[IPC]::[EMIT]::[LIENSCE]::[VERIFIED]::[SUCCESS]',
  VERIFIED_LIENSCE_KEY_FAILURE = '[IPC]::[EMIT]::[LIENSCE]::[VERIFIED]::[FAILURE]',
  LIENSCE_KEY_ERROR = '[IPC]::[EMIT]::[APIKEY]::[ERROR]',
  GET_SCHOOL_ID = '[IPC]::[EMIT]::[SCHOOL]::[GET]',
  UPDATE_SCHOOL_ID = '[IPC]::[EMIT]::[SCHOOL]::[UPDATE]',
  DELETE_SCHOOL_ID = '[IPC]::[EMIT]::[SCHOOL]::[DELETE]',
  SAVE_SCHOOL_ID = '[IPC]::[EMIT]::[SCHOOL]::[SAVE]',
  RETRIEVE_SCHOOL_ID = '[IPC]::[EMIT]::[SCHOOL]::[RETRIEVE]',
  SCHOOL_ID_KEY_ERROR = '[IPC]::[EMIT]::[SCHOOL]::[ERROR]',
  SCHOOL_ID_KEY_DECRYPT = '[IPC]::[EMIT]::[SCHOOL]::[DECRYPT]'
}

/**
 * action to emit event to get the liensce LIENSCEKEY
 * @export
 * @class GetApiKey
 * @implements {Action}
 */
export class GetApiKey implements Action {
  readonly type = ProcessStoreEvents.GET_APIKEY_KEY;
}

/**
 * action to emit an event to delete the liensce key
 *
 * @export
 * @class DelApiKey
 * @implements {Action}
 */
export class DelApiKey implements Action {
  readonly type = ProcessStoreEvents.GET_APIKEY_KEY;
}
/**
 * action to emit an event to update the liensce key
 *
 * @export
 * @class UpdateApiKey
 * @implements {Action}
 */
export class UpdateApiKey implements Action {
  readonly type = ProcessStoreEvents.UPDATE_APIKEY_KEY;
  constructor(public payload: string) {}
}
/**
 * action to save the liensce key to the local store
 *
 * @export
 * @class SaveApiKey
 * @implements {Action}
 */
export class SaveApiKey implements Action {
  readonly type = ProcessStoreEvents.SAVE_APIKEY_KEY;
  constructor(public payload: string) {}
}

/**
 * action to retrieve the liensce key from the local store
 *
 * @export
 * @class RetrieveApiKey
 * @implements {Action}
 */
export class RetrieveApiKey implements Action {
  readonly type = ProcessStoreEvents.RETRIEVE_APIKEY_KEY;
}

/**
 * action for an error during ApiKeyError action
 *
 * @export
 * @class ApiKeyError
 * @implements {Action}
 */
export class ApiKeyError implements Action {
  readonly type = ProcessStoreEvents.APIKEY_KEY_ERROR;
  constructor(public payload: Error) {}
}
/**
 * action to emit event to get the liensce get
 *
 * @export
 * @class GetApiKey
 * @implements {Action}
 */
export class GetLiensceKey implements Action {
  readonly type = ProcessStoreEvents.GET_LIENSCE_KEY;
}

/**
 * action to emit an event to delete the liensce key
 *
 * @export
 * @class DelApiKey
 * @implements {Action}
 */
export class DelLiensceKey implements Action {
  readonly type = ProcessStoreEvents.DELETE_LIENSCE_KEY;
}

/**
 * action to emit an event to update the liensce key
 *
 * @export
 * @class DelApiKey
 * @implements {Action}
 */
export class UpdateLiensceKey implements Action {
  readonly type = ProcessStoreEvents.UPDATE_LIENSCE_KEY;
  constructor(public payload: SchoolEncryptedData) {}
}

/**
 * action to retrieve the liensce key from the local store
 *
 * @export
 * @class RetrieveApiKey
 * @implements {Action}
 */
export class RetrieveLiensceKey implements Action {
  readonly type = ProcessStoreEvents.RETRIEVE_LIENSCE_KEY;
}
/**
 * Action dispatched to verify liensce key
 *
 * @export
 * @class VerifyLiensceKey
 * @implements {Action}
 */
export class VerifyLiensceKey implements Action {
  readonly type = ProcessStoreEvents.VERITY_LIENSCE_KEY;
  constructor(public payload: string) {}
}
/**
 * Action dispatched to notify the store of success of liensce verification
 *
 * @export
 * @class VerifiedLiensceKeySuccess
 * @implements {Action}
 */
export class VerifiedLiensceKeySuccess implements Action {
  readonly type = ProcessStoreEvents.VERIFIED_LIENSCE_KEY_SUCCESS;
  constructor(public payload: SchoolEncryptedData) {}
}
/**
 * Action dispatched to notify the store of failure of liensce verification
 *
 * @export
 * @class RetrieveLiensceKeyFailure
 * @implements {Action}
 */
export class VerifyLiensceKeyFailure implements Action {
  readonly type = ProcessStoreEvents.VERIFIED_LIENSCE_KEY_FAILURE;
  constructor(public payload: Error) {}
}

/**
 * action for an error during ApiKeyError action
 *
 * @export
 * @class ApiKeyError
 * @implements {Action}
 */
export class LiensceKeyError implements Action {
  readonly type = ProcessStoreEvents.LIENSCE_KEY_ERROR;
  constructor(public payload: Error) {}
}

/**
 * action to emit event to get the schoolId get
 *
 * @export
 * @class GetSchoolId
 * @implements {Action}
 */
export class GetSchoolId implements Action {
  readonly type = ProcessStoreEvents.GET_SCHOOL_ID;
}

/**
 * action to emit an event to delete the liensce key
 *
 * @export
 * @class DelSchoolId
 * @implements {Action}
 */
export class DelSchoolId implements Action {
  readonly type = ProcessStoreEvents.DELETE_SCHOOL_ID;
}

/**
 * action to emit an event to update the liensce key
 *
 * @export
 * @class DelSchoolId
 * @implements {Action}
 */
export class UpdateSchoolId implements Action {
  readonly type = ProcessStoreEvents.UPDATE_SCHOOL_ID;
  constructor(public payload: string) {}
}
/**
 * action to save the liensce key to the local store
 *
 * @export
 * @class SaveSchoolId
 * @implements {Action}
 */
export class SaveSchoolId implements Action {
  readonly type = ProcessStoreEvents.SAVE_SCHOOL_ID;
  constructor(public payload: string) {}
}

/**
 * action to retrieve the liensce key from the local store
 *
 * @export
 * @class RetrieveSchoolId
 * @implements {Action}
 */
export class RetrieveSchoolId implements Action {
  readonly type = ProcessStoreEvents.RETRIEVE_SCHOOL_ID;
}
/**
 * action dispatche to notify the store of any error
 *
 * @export
 * @class SchoolIdError
 * @implements {Action}
 */
export class SchoolIdError implements Action {
  readonly type = ProcessStoreEvents.SCHOOL_ID_KEY_ERROR;
  constructor(public payload: Error) {}
}

/**
 * Action dispatched to decrypt a token
 *
 * @export
 * @class DecryptSchoolApiKey
 * @implements {Action}
 */
// export class DecryptSchoolApiKey implements Action {
//   readonly type = ProcessStoreEvents.SCHOOL_ID_KEY_DECRYPT;
//   constructor(public payload: string) { };
// }

export type ProcessStoreActions =
  | GetApiKey
  | DelApiKey
  | ApiKeyError
  | SaveApiKey
  | GetSchoolId
  | DelSchoolId
  | RetrieveSchoolId
  | SaveSchoolId
  | RetrieveApiKey
  | SchoolIdError
  | VerifyLiensceKey
  | VerifiedLiensceKeySuccess
  | VerifyLiensceKeyFailure;
