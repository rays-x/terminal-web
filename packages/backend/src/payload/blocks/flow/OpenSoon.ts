import {Block} from 'payload/types';

const OpenSoon: Block = {
    slug: 'openSoon',
    labels: {
        singular: 'OpenSoon',
        plural: 'OpenSoon'
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo:'media',
            required: true,
        },
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'description',
            type: 'text',
        },
    ],
};
export default OpenSoon