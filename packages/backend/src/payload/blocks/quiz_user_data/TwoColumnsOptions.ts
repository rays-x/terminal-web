import {Block} from 'payload/types';

export const TwoColumnsOptions: Block = {
  slug: 'two_columns_options',
  labels: {
    singular: 'two_columns_options',
    plural: 'two_columns_options'
  },
  fields: [
    {
      name: 'options',
      type: 'group',
      fields: [
        {
          name: 'button',
          type: 'text',
        },
      ]
    },
    {
      name: 'content',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'text',
          type: 'text'
        },
        {
          name: 'analytic_key',
          type: 'text'
        }
      ],
    }
  ],
};
