import {buildConfig}          from 'payload/config';
import {defaultPayloadConfig} from './payload.config';
import {Config}               from 'payload/config';

const configProduction: Config={
  ...defaultPayloadConfig,
  serverURL:`https://backend-stage.soulmate.tech`
};
export default buildConfig(configProduction);
