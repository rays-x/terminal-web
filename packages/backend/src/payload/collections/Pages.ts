import {CollectionConfig} from 'payload/types';
import defaultAccess from "../utilities/defaultAccess";

const Pages: CollectionConfig = {
  // the slug is used for naming the collection in the database and the APIs that are open. For example: api/posts/${id}
  slug: 'pages',
  admin: {
    hideAPIURL:true,
    // this is the name of a field which will be visible for the edit screen and is also used for relationship fields
    useAsTitle: 'title',
    // defaultColumns is used on the listing screen in the admin UI for the collection
    defaultColumns: [
      'title',
      'slug',
      'type'
    ],
  },
  access: defaultAccess,
  // versioning with drafts enabled tells Payload to save documents to a separate collection in the database and allow publishing
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true
    },
    {
      name: 'type',
      type: 'select',
      options: ['text'],
      defaultValue: 'text',
      required: true
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      localized: true
    },

  ],
}

export default Pages;
