import {Block} from 'payload/types';

export const QuestionMessage: Block = {
    slug: 'message',
    labels: {
        singular: 'message',
        plural: 'message'
    },
    fields: [
        {
            name: 'content',
            type: 'text',
            required: true,
        },
    ],
};
