import {CollectionConfig} from 'payload/types';
import {QuestionMessage} from "../blocks/quiz/QuestionMessage";
import {TextInput} from "../blocks/quiz/TextInput";
import {VerticalActions} from "../blocks/quiz/VerticalActions";
import {TwoColumnsOptions} from "../blocks/quiz/TwoColumnsOptions";
import {VerticalOptions} from "../blocks/quiz/VerticalOptions";
import {TwoHorizontalOptions} from "../blocks/quiz/TwoHorizontalOptions";
import defaultAccess from "../utilities/defaultAccess";

export const Quiz: CollectionConfig = {
    slug: 'quiz',
    labels: {
        singular: 'Quiz',
        plural: 'Quiz'
    },
    hooks: {
        /*beforeOperation: [
            ({args, operation}) => {
                console.log('args', args);
                console.log('operation', operation);
            }
        ]*/
    },
    admin: {
        hideAPIURL:true,
        // this is the name of a field which will be visible for the edit screen and is also used for relationship fields
        useAsTitle: 'docId',
        // defaultColumns is used on the listing screen in the admin UI for the collection
        defaultColumns: [
            'docId',
            'createdAt',
            'category'
        ],
    },
    // the access is set to allow read for anyone
    access: defaultAccess,
    // versioning with drafts enabled tells Payload to save documents to a separate collection in the database and allow publishing
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: 'items',
            label: 'Items',
            type: 'blocks',
            minRows: 1,
            localized: true,
            blocks: [
                QuestionMessage,
            ],
        },
        {
            name: 'answer',
            type: 'blocks',
            maxRows: 1,
            minRows: 1,
            localized: true,
            blocks: [
                TextInput,
                VerticalActions,
                TwoColumnsOptions,
                VerticalOptions,
                TwoHorizontalOptions
            ],
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'category',
            required: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'docId',
            type: 'number',
            required: false,
            unique: true,
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'group',
            type: 'number',
            required: false,
            admin: {
                position: 'sidebar'
            }
        },
    ],
};

export default Quiz;
