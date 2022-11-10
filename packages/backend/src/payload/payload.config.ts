import React from 'react';
import {buildConfig} from 'payload/config';
import formBuilder from '@payloadcms/plugin-form-builder';
import nestedDocs from '@payloadcms/plugin-nested-docs';
import seo from '@payloadcms/plugin-seo';
import path from 'path';
import Categories from './collections/Categories';
import Onboarding from './collections/Onboarding';
import Media from './collections/Media';
import Posts from './collections/Posts';
import Users from './collections/Users';
import Pages from './collections/Pages';
import MainMenu from './globals/MainMenu';
// import SiteSettings from './globals/SiteSettings';
import BeforeLogin from './components/BeforeLogin';
import AfterDashboard from './components/AfterDashboard';
import {Alerts} from './collections/Alerts';
import BeforeDashboard from './components/BeforeDashboard';
import BeforeNavLinks from './components/BeforeNavLinks';
import {Config} from 'payload/config';
import Quiz from "./collections/Quiz";
import Flow from "./collections/Flow/Flow";
import QuizUserData from "./collections/QuizUserData";
import Photos from "./collections/Photos";
import AppSettings from "./globals/AppSettings";

import SMLogo from './components/Logo/SmLogo';
import Matches from "./collections/Matches";
// the payload config is the entrypoint for configuring the entire application
// all the API REST, GraphQL, authentication, file uploads, data layer and admin UI is built from the config
export const defaultPayloadConfig: Config = {
  routes: {
    api: '/api/admin',
    admin: '/admin'
  },
  // the serverURL can be localhost:, a public domain or simply left undefined to work with relative
  serverURL: `http://localhost:${process.env.PORT || 2050}`,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Admin',
      ogImage: path.resolve(__dirname, './client/static/assets/images/icon.png'),
      favicon: path.resolve(__dirname, './client/static/assets/images/icon.png')
    },
    css: path.resolve(__dirname, './styles/custom.scss'),
    components: {
      beforeLogin: [
        BeforeLogin
      ],
      beforeDashboard: [
        BeforeDashboard
      ],
      afterDashboard: [
        AfterDashboard
      ],
      beforeNavLinks: [
        BeforeNavLinks
      ],
      graphics: {
        Logo: () => SMLogo({width: 160}),
        Icon: () => SMLogo({width: 100})
      }
    },
    /*webpack: (config) => {
      return {
        ...config,
        cache: false
      }
    }*/
  },
  // collections in Payload are synonymous with database tables, models or entities from other frameworks and systems
  collections: [
    Categories,
    Flow,
    Media,
    Quiz,
    QuizUserData,
    /*
    Posts,
    Pages,
    Alerts,
    */
    Pages,
    Photos,
    Users,
    Matches,
    // Onboarding
  ],
  // globals are a single-instance collection, often used for navigation or site settings that live in one place
  globals: [
    /*MainMenu,*/
    // SiteSettings
    AppSettings
  ],
  // rateLimits provide basic API DDOS (Denial-of-service) protection and can limit accidental server load from scripts
  rateLimit: {
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
    max: 2400 // limit each IP per windowMs
  },
  // GraphQL is included by default at /api/graphql
  graphQL: {
    disablePlaygroundInProduction: false
  },
  // if not using graphQL it should be disabled for security and performance reasons
  // graphQL: false
  plugins: [
    /*formBuilder({
      redirectRelationships:['pages','posts']
    }),*/
    // @ts-ignore
    /*nestedDocs({
      collections:['pages'],
      parentFieldSlug:'parent',
      breadcrumbsFieldSlug:'breadcrumbs',
      generateLabel:(_,doc) => doc.title as string,
      generateURL:(docs) => docs.reduce((url,doc) => `${url}/${doc.slug}`,'')
    }),*/
    /*seo({
      collections:[
        'pages',
        'posts'
      ]
    })*/
  ],
  localization: {
    defaultLocale: 'en',
    locales: [
      'en',
      'ru'
    ]
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  }
};
export default buildConfig(defaultPayloadConfig);
