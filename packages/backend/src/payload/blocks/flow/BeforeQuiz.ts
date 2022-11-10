import {Block} from 'payload/types';

const BeforeQuiz: Block = {
  slug: 'beforeQuiz',
  labels: {
    singular: 'BeforeQuiz',
    plural: 'BeforeQuiz'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'list',
      type: 'array',
      minRows: 1,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                width: '50%'
              }
            },
            {
              name: 'emoji',
              type: 'upload',
              relationTo: 'media',
              admin: {
                width: '50%'
              }
            }
          ]
        }
      ],
    },
    {
      name: 'termsOfUseConsent',
      type: 'richText',
      admin: {
        elements: ['link'],
        leaves: [],
      },
    },
    {
      name: 'button',
      type: 'text',
      required: true,
    },
  ],
};
export default BeforeQuiz