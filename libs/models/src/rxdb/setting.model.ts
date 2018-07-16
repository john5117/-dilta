import { EntityNames } from '@dilta/store';
import { CollectionConfig } from './setup.mainframe';

/** key to retrieve the collection form the db intialize object */

/**
 * stores schools and user settings configuration and properties
 */
export const settingSchema = {
  title: 'School and Users configuration store',
  version: 0,
  description: 'stores schools and user settings configuration and properties',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      primary: true
    },
    owner: {
      type: 'string',
      final: true
    },
    type: {
      type: 'string'
    },
    settings: {
      type: 'object',
      properties: {},
      additionalProperties: false
    },
    school: {
      ref: 'school',
      type: 'string',
      final: true
    }
  },
  required: [
    'owner',
    'type',
    'school',
    'settings'
  ],
  additionalProperties: true
};

export const SettingModel: CollectionConfig<typeof settingSchema> = {
  name: EntityNames.Setting,
  schema: settingSchema
};
