import { EntityNames } from '@dilta/store';
import { CollectionConfig } from './setup.mainframe';

/** key to retrieve the collection form the db intialize object */

/**
 * the student's payment receipt schema configuration and properties
 */
export const ExpenseSchema = {
  title: 'School expense Schema',
  version: 0,
  description: 'stores users expense schema',
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
    date: {
      type: 'string',
      final: true
    },
    amount: {
      type: 'number',
      final: true
    },
    receiverId: {
      type: 'string'
    },
    busarId: {
      type: 'string',
      final: true
    },
    purpose: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    universalId: {
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
    createdAt: {
      type: 'string',
      final: true
    },
    updatedAt: {
      type: 'string'
    },
    capital: {
      type: 'boolean'
    },
    school: {
      ref: 'school',
      type: 'string',
      final: true
    }
  },
  required: [
    'busarId',
    'name',
    'amount',
    'session',
    'term',
    'universalId',
    'school',
    'createdAt'
  ]
};

export const ExpenseModel: CollectionConfig<typeof ExpenseSchema> = {
  name: EntityNames.Expense,
  schema: ExpenseSchema
};
