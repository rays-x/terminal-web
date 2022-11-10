import {Block} from 'payload/types';

export const VerticalOptions: Block = {
  slug: 'vertical_options',
  labels: {
    singular: 'vertical_options',
    plural: 'vertical_options'
  },
  fields: [
    {
      name: 'content',
      type: 'array',
      maxRows: 4,
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'text',
          type: 'text',
          required: true
        }
      ],
    },
  ],
};
