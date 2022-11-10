import {Block} from 'payload/types';

export const VerticalActions: Block = {
    slug: 'vertical_actions',
    labels: {
        singular: 'vertical_actions',
        plural: 'vertical_actions'
    },
    fields: [
        {
            name: 'content',
            type: 'array',
            maxRows: 2,
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
        },
    ],
};
