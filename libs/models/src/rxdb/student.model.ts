import { EntityNames } from '@dilta/store';
import { CollectionConfig } from './setup.mainframe';

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
    id: {
      type: 'string',
      primary: true
    },
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
      type: 'string'
    },
    bloodgroup: {
      type: 'string'
    },
    prevschool: {
      type: 'string'
    },
    parentPhone: {
      ref: 'parent',
      type: 'string',
      final: true
    },
    school: {
      ref: 'school',
      type: 'string',
      final: true
    }
  },
  required: ['name', 'class', 'dob', 'gender', 'parentPhone', 'school']
};

export const studentModel: CollectionConfig<typeof studentSchema> = {
  name: EntityNames.Student,
  schema: studentSchema
};
