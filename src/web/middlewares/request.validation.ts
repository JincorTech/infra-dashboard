import * as Joi from 'joi';
import { Response, Request, NextFunction } from 'express';
import { UNPROCESSABLE_ENTITY } from 'http-status';

import { responseErrorWithObject } from '../helpers/responses';

const notStrictOptions = {
  allowUnknown: true
};

/**
 * Common template method for joi middleware
 *
 * @param scheme
 * @param data
 * @param res
 * @param next
 */
/* istanbul ignore next */
export function joiValidateMiddleware(scheme: Joi.Schema, data: any, res: Response, next: NextFunction) {
  const result = Joi.validate(data || {}, scheme, notStrictOptions);

  if (result.error) {
    return responseErrorWithObject(res, {
      'error': result.error,
      'details': result.value
    }, UNPROCESSABLE_ENTITY);
  } else {
    return next();
  }
}
