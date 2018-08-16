import { CollectionConfig } from '@dilta/models/src/rxdb/setup.mainframe';
import { EntityNames } from '@dilta/store';
import { baseModel } from './shared.model';

/** key to retrieve the collection form the db intialize object */

/**
 * the student's payment receipt schema configuration and properties
 */
export const receiptSchema = {
  title: 'User Receipt Schema',
  version: 0,
  description: 'stores users payments receipt schema',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      unique: true,
      final: true
    },
    date: {
      type: 'number',
      final: true
    },
    teacherId: {
      type: 'string',
      final: true
    },
    studentId: {
      type: 'string',
      final: true
    },
    session: {
      type: 'string',
      final: true
    },
    term: {
      type: 'string',
      final: true
    },
    class: {
      type: 'string',
      final: true
    },
    ...baseModel.schema
  },
  required: [...baseModel.required]
};

export const receiptModel: CollectionConfig<typeof receiptSchema> = {
  name: EntityNames.Receipt,
  schema: receiptSchema
};
