import { EntityNames } from '@dilta/store';
import { CollectionConfig } from './setup.mainframe';

/** key to retrieve the collection form the db intialize object */
const SCHOOL_NAME = 'school';

/**
 * the student biodata schema configuration and properties
 */
export const schoolSchema = {
  title: 'School BioData Schema',
  version: 0,
  description: 'stores the school biodata information',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    name: {
      type: 'string',
      unique: true,
      final: true
    },
    email: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    address: {
      type: 'string'
    },
    town: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    logo: {
      type: 'string'
    }
  },
  required: []
  // ['name', 'description', 'address',
  //     'category', 'town', 'state']
};

export const schoolModel: CollectionConfig<typeof schoolSchema> = {
  name: EntityNames.School,
  schema: schoolSchema
};
