import {Block} from 'payload/types';

export const TwoHorizontalOptions: Block = {
    slug: 'two_horizontal_options',
    labels:{
      singular:'two_horizontal_options',
      plural:'two_horizontal_options'
    },
    fields: [
        {
            name: 'content',
            type: 'array',
            maxRows: 2,
            fields: [
                {
                    name: 'file',
                    type: 'upload',
                    relationTo: 'media'
                },
                {
                    name: 'text',
                    type: 'text'
                }
            ],
        },
    ],
};
