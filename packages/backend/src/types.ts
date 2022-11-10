import {Request} from 'express';
import {Session} from 'express-session';

export class ExpressRequest extends Request{
  session: Session;
}
