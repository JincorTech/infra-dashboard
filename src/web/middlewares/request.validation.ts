import * as Joi from 'joi';
import { Response, Request, NextFunction, RequestHandler } from 'express';

import { ValidationException } from '../../exceptions';

const notStrictOptions = {
  allowUnknown: true
};

/* istanbul ignore next */
export function joiValidateMiddleware(scheme: Joi.Schema): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = Joi.validate(req.body || {}, scheme, notStrictOptions);
    if (result.error) {
      return next(new ValidationException(result.error));
    } else {
      return next();
    }
  }
}
