import { BaseModel } from '@dilta/models/src/rxdb/models';
import * as uuidRandom from 'uuid/v4';

export const baseModel = {
  schema: {
    id: {
      type: 'string',
      primary: true
    },
    hash: {
      type: 'string'
    },
    createdAt: {
      type: 'number'
    },
    updatedAt: {
      type: 'number'
    },
    school: {
      ref: 'school',
      type: 'string',
      final: true
    }
  },
  required: ['hash', 'createdAt', 'updatedAt', 'school']
};

/**
 * to set base required parameters for the aplication
 *
 * @export
 * @template T
 * @param {*} doc
 * @returns {T}
 */
export function updateBaseModel<T extends BaseModel>(doc: any): T {
  return {
    ...doc,
    ...generateBase(doc)
  };
}

/**
 * to generate base required parameters
 *
 * @template T
 * @param {T} doc
 * @returns {BaseModel}
 */
function generateBase<T extends BaseModel>(doc: T): BaseModel {
  const date = Date.now();
  return {
    id: doc.id ? doc.id : uuidRandom(),
    createdAt: !doc.createdAt ? date : doc.createdAt,
    hash: doc.hash ? doc.hash : `${date.toString()}::${uuidRandom()}`,
    updatedAt: date,
    school: doc.school
  };
}
