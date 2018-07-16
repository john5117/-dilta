import { EntityNames } from '@dilta/store';
import { CollectionConfig } from './setup.mainframe';

/** key to retrieve the collection form the db intialize object */

/**
 * subject record information and schema
 */
export const userSchema = {
  title: 'Admin Schema',
  version: 0,
  description: 'stores various users biodata',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string'
    },
    gender: {
      type: 'string'
    },
    phoneNo: {
      type: 'number'
    },
    class: {
      type: 'string',
      default: 'none'
    },
    subject: {
      type: 'string',
      default: 'none'
    },
    phoneNos: {
      type: 'string'
    },
    level: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    authId: {
      ref: 'auth',
      type: 'string',
      final: true
    },
    school: {
      ref: 'school',
      type: 'string',
      final: true
    }
  },
  required: ['name', 'gender', 'address', 'email', 'authId', 'school']
};

export const userModel: CollectionConfig<typeof userSchema> = {
  name: EntityNames.User,
  schema: userSchema
};
