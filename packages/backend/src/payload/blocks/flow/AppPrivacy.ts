import {Block} from 'payload/types';

const AppPrivacy: Block = {
    slug: 'appPrivacy',
    labels: {
        singular: 'AppPrivacy',
        plural: 'AppPrivacy'
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
            name: 'content',
            type: 'group',
            fields: [
                {
                    name: 'type',
                    type: 'select',
                    options: [
                        {
                            label: 'Image',
                            value: 'image'
                        },
                        {
                            label: 'Video',
                            value: 'video'
                        }
                    ],
                    defaultValue: 'image',
                    required: true
                },
                {
                    name: 'file',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                }
            ],
            required: true,
        },
        {
            name: 'buttons',
            type: 'group',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'next',
                            type: 'text',
                            required: true,
                            admin: {
                                width: '50%'
                            }
                        },
                        {
                            name: 'skip',
                            type: 'text',
                            admin: {
                                width: '50%'
                            }
                        }
                    ]
                }
            ],
        },
    ],
};
export default AppPrivacy
