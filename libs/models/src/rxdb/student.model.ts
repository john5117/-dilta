import { CollectionConfig } from '@dilta/models/src/rxdb/setup.mainframe';
import { EntityNames } from '@dilta/store';
import { baseModel } from './shared.model';

/** key to retrieve the collection form the db intialize object */

/**
 * the student biodata schema configuration and properties
 */
export const studentSchema = {
  title: 'Student Schema',
  version: 0,
  description: 'stores student biodata records',
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    class: {
      type: 'string'
    },
    gender: {
      type: 'string'
    },
    dob: {
      type: 'number'
    },
    bloodgroup: {
      type: 'string'
    },
    prevschool: {
      type: 'string'
    },
    parentPhone: {
      type: 'string',
      final: true
    },
    ...baseModel.schema
  },
  required: [
    'name',
    'class',
    'dob',
    'gender',
    'parentPhone',
    ...baseModel.required
  ]
};

export const studentModel: CollectionConfig<typeof studentSchema> = {
  name: EntityNames.Student,
  schema: studentSchema
};
