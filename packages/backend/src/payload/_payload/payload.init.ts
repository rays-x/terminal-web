import payload, {Payload} from 'payload';
import express, {NextFunction, Response} from 'express';
import crypto from 'crypto';
import {InitOptions} from 'payload/dist/config/types';
import connectMongoose from 'payload/dist/mongoose/connect';
import initAdmin from 'payload/dist/express/admin';
import access from 'payload/dist/auth/requestHandlers/access';
import initPreferences from 'payload/dist/preferences/init';
import initGlobals from 'payload/dist/globals/init';
import initStatic from 'payload/dist/express/static';
import buildEmail from 'payload/dist/email/build';
import errorHandler from 'payload/dist/express/middleware/errorHandler';
import {PayloadRequest} from 'payload/dist/express/types';
import sendEmail from 'payload/dist/email/sendEmail';
import loadConfig from 'payload/dist/config/load';
import Logger from 'payload/dist/utilities/logger';
import {getDataLoader} from "payload/dist/collections/dataloader";
//
import initAuth from '../_payload/auth/init';
import authenticate from '../_payload/express/middleware/authenticate';
import expressMiddleware from '../_payload/express/middleware';
import initCollections from '../_payload/collections/init';

const init = (payload: Payload, options: InitOptions): void => {
  payload.logger = Logger('payload', options.loggerOptions);
  payload.logger.info('Starting Payload...');
  if(!options.secret) {
    throw new Error(
      'Error: missing secret key. A secret key is needed to secure Payload.'
    );
  }
  if(options.mongoURL !== false && typeof options.mongoURL !== 'string') {
    throw new Error('Error: missing MongoDB connection URL.');
  }
  payload.emailOptions = {...(options.email)};
  payload.secret = crypto
  .createHash('sha256')
  .update(options.secret)
  .digest('hex')
  .slice(0, 32);
  payload.mongoURL = options.mongoURL;
  payload.config = loadConfig(payload.logger);
  // If not initializing locally, scaffold router
  payload.router = express.Router();
  payload.router.use(...expressMiddleware(payload));
  initAuth(payload);
  // Configure email service
  // payload.email = buildEmail(payload.emailOptions, payload.logger);
  // payload.sendEmail = sendEmail.bind(payload);
  // Initialize collections & globals
  payload.router.get(`/${payload.config.admin.user}/init`, (req, res) => {
    return res.json({
      initialized: true
    });
  });
  payload.router.get(`/${payload.config.admin.user}/me`, (req: PayloadRequest, res) => {
    return res.redirect(301, '/api/rest/profile');
  });
  initCollections(payload);
  initGlobals(payload);
  // If not initializing locally, set up HTTP routing
  options.express.use((req: PayloadRequest, res, next) => {
    req.payload = payload;
    next();
  });
  options.express.use((req: PayloadRequest, res: Response, next: NextFunction): void => {
    req.payloadDataLoader = getDataLoader(req);
    return next();
  });
  payload.express = options.express;
  if(payload.config.rateLimit.trustProxy) {
    payload.express.set('trust proxy', 1);
  }
  const {NODE_ENV} = process.env;
  // process.env.NODE_ENV='production';
  initAdmin(payload);
  process.env.NODE_ENV = NODE_ENV;
  initPreferences(payload);
  payload.router.get('/access', access);
  // Bind router to API
  payload.express.use(payload.config.routes.api, payload.router);
  // Enable static routes for all collections permitting upload
  initStatic(payload);
  payload.errorHandler = errorHandler(payload.config, payload.logger);
  payload.router.use(payload.errorHandler);
  payload.authenticate = authenticate(payload.config);
};
export const initAsync = async (payload: Payload, options: InitOptions): Promise<void> => {
  payload.logger = Logger('payload', options.loggerOptions);
  payload.mongoURL = options.mongoURL;
  if(payload.mongoURL) {
    payload.mongoMemoryServer = await connectMongoose(payload.mongoURL, options.mongoOptions, payload.logger);
  }
  init(payload, options);
  if(typeof options.onInit === 'function') await options.onInit(payload);
  if(typeof payload.config.onInit === 'function') await payload.config.onInit(payload);
};
export const initSync = (payload: Payload, options: InitOptions): void => {
  payload.logger = Logger('payload', options.loggerOptions);
  payload.mongoURL = options.mongoURL;
  if(payload.mongoURL) {
    connectMongoose(payload.mongoURL, options.mongoOptions, payload.logger);
  }
  init(payload, options);
  if(typeof options.onInit === 'function') options.onInit(payload);
  if(typeof payload.config.onInit === 'function') payload.config.onInit(payload);
};
export default initSync;
