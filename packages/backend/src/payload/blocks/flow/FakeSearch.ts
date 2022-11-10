import {Block} from 'payload/types';

const FakeSearch: Block = {
    slug: 'fakeSearch',
    labels: {
        singular: 'FakeSearch',
        plural: 'FakeSearch'
    },
    fields: [
        {
            name: 'video',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'progressItems',
            type: 'array',
            minRows: 1,
            fields: [
                {
                    name: 'content',
                    type: 'text',
                    required: true,
                }
            ]
        },
    ],
};
export default FakeSearch