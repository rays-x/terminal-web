import {CollectionConfig} from 'payload/types';
import CategorySummary from '../components/CategorySummary'
import defaultAccess from "../utilities/defaultAccess";

const Categories: CollectionConfig = {
    slug: 'category',
    labels: {
        singular: 'Category',
        plural: 'Categories'
    },
    admin: {
        hideAPIURL:true,
        useAsTitle: 'name',
        defaultColumns: ['name', 'id', 'archived']
    },
    access: defaultAccess,
    versions: {
        drafts: true,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            localized: true,
        },
        {
            name: 'archived',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                description: 'Archiving filters it from being an option in the quiz collection',
            },
        },
        {
            name: 'summary',
            // ui fields do not impact the database or api, and serve as placeholders for custom components in the admin panel
            type: 'ui',
            admin: {
                position: 'sidebar',
                components: {
                    // this custom component will fetch the posts count for how many posts have this category
                    Field: CategorySummary,
                }
            }
        }
    ],
}

export default Categories;
