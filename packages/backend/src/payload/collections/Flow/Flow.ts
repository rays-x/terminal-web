import {CollectionConfig} from 'payload/types';
import defaultAccess from "../../utilities/defaultAccess";
import Onboarding from "../../blocks/flow/Onboarding";
import BeforeQuiz from "../../blocks/flow/BeforeQuiz";
import QuizContainer from "../../blocks/flow/QuizContainer";
import OpenSoon from "../../blocks/flow/OpenSoon";
import FakeSearch from "../../blocks/flow/FakeSearch";
import Paywall from "../../blocks/flow/Paywall";
import AppPrivacy from "../../blocks/flow/AppPrivacy";
import AppNotifications from "../../blocks/flow/AppNotifications";
import ApplicationUpdate from "../../blocks/flow/ApplicationUpdate";
import Welcome from "../../blocks/flow/Welcome";
import {get} from "lodash";
import serializeSlateHtml from "../../../utils/serelizeSlateHtml";
import serializeHtmlMarkdown from "../../../utils/serelizeHtmlMarkdown";
import {isObject} from "../../utilities/deepMerge";


export const Flow: CollectionConfig = {
  slug: 'flow',
  labels: {
    singular: 'Flow',
    plural: 'Flow'
  },
  hooks: {
    beforeRead: [
      ({
         doc,
         req
       }) => {
        if(req.payloadAPI !== 'local') {
          return;
        }
        doc['items'] = Object.fromEntries(Object.entries<any[]>(doc['items']).map(([key, value]) =>{
          return  [key, value.map(item => {
            if(get(item, 'blockType') !== 'beforeQuiz') {
              return item
            }
            const termsOfUseConsent = get(item, 'termsOfUseConsent')
            if(!termsOfUseConsent && !(isObject(termsOfUseConsent) || Array.isArray(termsOfUseConsent))) {
              return item
            }
            const match = Object.fromEntries(Object.entries(Array.isArray(termsOfUseConsent) ? get(termsOfUseConsent, `0`) : termsOfUseConsent).map(([key, value]) => [key, serializeHtmlMarkdown(serializeSlateHtml(value))]))
            item['termsOfUseConsent'] = get(match, 'children', match)
            return item
          })]
        }))
      }
    ]
  },
  admin: {
    hideAPIURL: true,
    // this is the name of a field which will be visible for the edit screen and is also used for relationship fields
    useAsTitle: 'slug',
    // defaultColumns is used on the listing screen in the admin UI for the collection
    defaultColumns: [
      'slug',
      'createdAt'
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
      name: 'type',
      type: 'select',
      options: ['web', 'ios'],
      defaultValue: 'web',
      required: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'slug',
      type: 'text',
      // unique: true,
      required: true
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true
    },
    {
      name: 'items',
      label: 'Items',
      type: 'blocks',
      minRows: 1,
      localized: true,
      blocks: [
        Onboarding,
        AppPrivacy,
        AppNotifications,
        ApplicationUpdate,
        BeforeQuiz,
        QuizContainer,
        OpenSoon,
        FakeSearch,
        Paywall,
        Welcome,
      ],
    }
  ],
};

export default Flow;
