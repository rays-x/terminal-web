import {CollectionConfig} from 'payload/types';
import adminAccess from "../utilities/adminAccess";

const Matches: CollectionConfig = {
    slug: 'matches',
    access: adminAccess,
    admin: {
        hideAPIURL: true,
    },
    fields: [
        {
            name: 'author',
            type: 'relationship',
            required: true,
            relationTo: 'user'
        },
        {
            name: 'target',
            type: 'relationship',
            required: true,
            relationTo: 'user'
        },
        {
            name: 'type',
            type: 'select',
            required: true,
            options: ['like','dislike'],
            defaultValue:'like'
        }
    ]
};
export default Matches;
