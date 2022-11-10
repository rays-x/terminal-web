import {Block} from 'payload/types';

const Welcome: Block = {
    slug: 'welcome',
    labels: {
        singular: 'Welcome',
        plural: 'Welcome'
    },
    fields: [
        {
            name: 'image',
            type: 'upload',
            relationTo:'media',
            required:true,
        },
        {
            name: 'title',
            type: 'text',
        },
        {
            name: 'subtitle',
            type: 'text',
            required:true,
        },
        {
            name: 'button',
            type: 'text',
            required:true,
        },
        {
            name: 'links',
            type: 'array',
            maxRows:2,
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'text',
                            type: 'text',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            name: 'url',
                            type: 'text',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        }
                    ]
                }
            ],
        },
        {
            name: 'info',
            type: 'text',
            required:true,
        },
    ],
};
export default Welcome
