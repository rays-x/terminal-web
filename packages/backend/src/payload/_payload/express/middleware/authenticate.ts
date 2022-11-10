import passport                        from 'passport';
import {Request,Response,NextFunction} from 'express';
import {SanitizedConfig}               from 'payload/dist/config/types';

export type PayloadAuthenticate=(req: Request,res: Response,next: NextFunction) => NextFunction;
export default (config: SanitizedConfig): PayloadAuthenticate => {
  const methods=['jwt','anonymous'];
  const authenticate=passport.authenticate(methods,{session:false});
  return authenticate;
};
