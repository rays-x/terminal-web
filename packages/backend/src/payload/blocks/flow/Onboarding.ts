import {Block} from 'payload/types';

const Onboarding: Block = {
    slug: 'onboarding',
    labels: {
        singular: 'Onboarding',
        plural: 'Onboarding'
    },
    fields: [
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
                            name: 'signIn',
                            type: 'text',
                            admin: {
                                width: '50%'
                            }
                        }
                    ]
                }
            ],
        },
        {
            name: 'items',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true
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
                    required: true
                }
            ],
            required: true,
            minRows: 1
        },
    ],
};
export default Onboarding
