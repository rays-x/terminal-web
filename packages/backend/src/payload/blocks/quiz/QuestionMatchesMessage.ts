import {Block} from 'payload/types';

const QuestionMatchesMessage: Block = {
    slug: 'matches_message',
    labels: {
        singular: 'matches_message',
        plural: 'matches_message'
    },
    fields: [
        {
            name: 'content',
            type: 'group',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'subtitle',
                    type: 'text'
                },
                {
                    name: 'file',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                }
            ]
        },
    ],
};
export default QuestionMatchesMessage