import {Access} from 'payload/config';
import {CollectionConfig} from 'payload/types';
import {CookieStrategy} from '../_payload/auth/strategies/cookies';
import {get} from "lodash";
import defaultAccess from "../utilities/defaultAccess";

const Users: CollectionConfig = {
  slug: 'user',
  admin: {
    hideAPIURL:true,
    useAsTitle: 'name'
  },
  access: defaultAccess,
  // auth enabled collections get email and other fields for secure authentication in addition to the fields you add
  fields: [
    {
      name: 'name',
      type: 'text'
    },
    {
      name: 'email',
      hidden: true,
      type: 'text'
    },
    {
      name: 'fake',
      type: 'checkbox',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'sex',
      type: 'select',
      options: ['male', 'female'],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'language',
      type: 'select',
      options: ['en', 'ru'],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'params',
      type: 'group',
      hidden: true,
      admin: {
        position: 'sidebar'
      },
      fields: [
        {
          name: 'birthday',
          type: 'text',
        },
        {
          name: 'sex',
          type: 'text',
        },
        {
          name: 'lookingForSex',
          type: 'text',
        },
        {
          name: 'lookingForAge',
          type: 'text',
        },
      ]
    },
    {
      name: 'photos',
      type: 'array',
      fields: [
        {
          name: 'photo',
          type: 'upload',
          relationTo: 'photos'
        }
      ]
    },
    {
      name: 'interests',
      type: 'array',
      hidden: true,
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'select',
              options: ['quiz_user_data', 'quiz', 'breakdown'],
              defaultValue: 'quiz',
              admin: {
                width: '33%'
              }
            },
            {
              name: 'identifier',
              type: 'text',
              admin: {
                width: '33%'
              }
            },
            {
              name: 'answer',
              type: 'text',
              admin: {
                width: '33%'
              }
            }
          ]
        }
      ]
    }
  ]
};
export default Users;
