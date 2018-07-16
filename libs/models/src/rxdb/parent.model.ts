import { EntityNames } from '@dilta/store';
import { CollectionConfig } from './setup.mainframe';

/** key to retrieve the collection form the db intialize object */

/**
 * the student's parent biodata schema configuration and properties
 */
export const parentSchema = {
  title: 'Student Parent Schema',
  version: 0,
  description: 'stores student parents biodata information',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    phoneNo: {
      type: 'string',
      unique: true,
      final: true
    },
    name: {
      type: 'string'
    },
    relationship: {
      type: 'string'
    },
    homeAddress: {
      type: 'string'
    },
    workAddress: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    profession: {
      type: 'string'
    },
    workcategory: {
      type: 'string'
    },
    town: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    school: {
      ref: 'school',
      type: 'string',
      final: true
    }
  },
  required: [
    'phoneNo',
    'name',
    'relationship',
    'homeAddress',
    'town',
    'state',
    'school'
  ]
};

export const parentModel: CollectionConfig<typeof parentSchema> = {
  name: EntityNames.Parent,
  schema: parentSchema
};
