import {CollectionConfig} from 'payload/types';

const Onboarding: CollectionConfig = {
    slug: 'onboarding',
    labels: {
        singular: 'Onboarding',
        plural: 'Onboardings'
    },
    admin: {
        useAsTitle: 'id',
        defaultColumns: ['id']
    },
    access: {
        read: () => true
    },
    fields: [
        {
            name: 'buttons',
            type: 'group',
            admin: {
                position: 'sidebar'
            },
            fields: [
                {
                    name: 'next',
                    type: 'text',
                    required: true
                },
                {
                    name: 'skip',
                    type: 'text'
                },
                {
                    name: 'signIn',
                    type: 'text'
                }
            ],
            localized: true
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
            localized: true,
            minRows: 2
        },
        {
            name: 'beforeQuiz',
            type: 'group',
            fields: [
                {
                    type: 'row',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                            required: true,
                            admin: {
                                width: '33%'
                            }
                        },
                        {
                            name: 'subtitle',
                            type: 'text',
                            admin: {
                                width: '33%'
                            }
                        },
                        {
                            name: 'button',
                            type: 'text',
                            required: true,
                            admin: {
                                width: '33%'
                            }
                        }
                    ]
                },
                {
                    name: 'list',
                    type: 'array',
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
                    ]
                }
            ],
            localized: true
        }
    ]
};
export default Onboarding;
