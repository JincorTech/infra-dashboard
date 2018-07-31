import * as Joi from 'joi';
import { Response, Request, NextFunction, RequestHandler } from 'express';

import { ValidationException } from '../../exceptions';

const notStrictOptions = {
  allowUnknown: true
};

export const validEthereumAddress = () => Joi.string().regex(/^0x[\da-fA-F]{40,40}$/);
export const validEthereumPk = () => Joi.string().regex(/^0x[\da-fA-F]{64,64}$/);

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
