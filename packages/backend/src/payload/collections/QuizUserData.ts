import {CollectionConfig} from 'payload/types';
import {QuestionMessage} from '../blocks/quiz/QuestionMessage';
import {TextInput} from '../blocks/quiz/TextInput';
import {VerticalActions} from '../blocks/quiz_user_data/VerticalActions';
import {TwoColumnsOptions} from '../blocks/quiz_user_data/TwoColumnsOptions';
import {VerticalOptions} from '../blocks/quiz_user_data/VerticalOptions';
import {TwoHorizontalOptions} from '../blocks/quiz_user_data/TwoHorizontalOptions';
import defaultAccess from '../utilities/defaultAccess';
import {PhotoPicker} from '../blocks/quiz/PhotoPicker';
import {SignIn} from "../blocks/quiz/SignIn";

export const QuizUserData: CollectionConfig = {
  slug: 'quiz_user_data',
  labels: {
    singular: 'Quiz User Data',
    plural: 'Quiz User Data'
  },
  admin: {
    hideAPIURL: true,
    // this is the name of a field which will be visible for the edit screen and is also used for relationship fields
    useAsTitle: 'name',
    // defaultColumns is used on the listing screen in the admin UI for the collection
    defaultColumns: [
      'name',
      'key',
      'items',
      'createdAt'
    ]
  },
  // the access is set to allow read for anyone
  access: defaultAccess,
  // versioning with drafts enabled tells Payload to save documents to a separate collection in the database and allow publishing
  versions: {
    drafts: true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'key',
      type: 'select',
      options: [
        'name',
        'email',
        'sex',
        'birthday',
        'photo',
        'lookingForSex',
        'lookingForAge',
        'purpose',
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'match',
      type: 'select',
      options: [
        '1+1',
        '1+2',
        '1+3',
        '2+2',
        '3+3',
      ],
      hasMany: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'nomatch',
      type: 'select',
      options: [
        '1+2',
        '2+3',
      ],
      hasMany: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'items',
      label: 'Items',
      type: 'blocks',
      minRows: 1,
      localized: true,
      blocks: [
        QuestionMessage
      ]
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
        TwoHorizontalOptions,
        PhotoPicker,
        SignIn,
      ]
    }
  ]
};
export default QuizUserData;
