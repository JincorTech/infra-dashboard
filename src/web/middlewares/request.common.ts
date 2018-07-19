import * as util from 'util';
import { Response, Request, NextFunction } from 'express';
import { NOT_ACCEPTABLE } from 'http-status';

import { NotFoundException, Exception } from '../../exceptions';
import config from '../../config';

/**
 * @param req
 */
export function getRemoteIpFromRequest(req: Request): string {
  let remoteIp = req.header('cf-connecting-ip') || req.header('x-real-ip') || req.ip;
  if (remoteIp.substr(0, 7) === '::ffff:') {
    remoteIp = remoteIp.substr(7);
  }

  return remoteIp;
}

/* istanbul ignore next */
export function contentMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method !== 'OPTIONS') {
    const acceptHeader = req.header('Accept') || '';
    if (acceptHeader !== 'application/json' && !acceptHeader.includes('application/vnd.infradashboard+json;')) {
      return res.status(NOT_ACCEPTABLE).json({
        error: 'Unsupported "Accept" header'
      });
    }

    const contentHeader = req.header('Content-Type') || '';
    if (contentHeader !== 'application/json' && !contentHeader.includes('application/x-www-form-urlencoded')) {
      return res.status(NOT_ACCEPTABLE).json({
        error: 'Unsupported "Content-Type"'
      });
    }
  }

  req.app.locals.remoteIp = getRemoteIpFromRequest(req);

  return next();
}

/**
 *
 */
export function notFoundRouteMiddleware() {
  return (_req: Request, _res: Response, next: NextFunction) => {
    const error = new NotFoundException();
    error.httpStatusCode = 404;
    next(error);
  };
}

/* istanbul ignore next */
/**
 *
 */
export function errorHandlerMiddleware() {
  return (error: Exception, _req: Request, res: Response, _next: NextFunction) => {
    const status = error.httpStatusCode || 500;
    res.status(status).json({
      statusCode: status,
      message: error.message,
      details:
        typeof error.details === 'undefined'
          ? undefined
          : util.inspect(error.details),
      debugDetails:
        config.logging.level === 'debug' ? util.inspect(error) : undefined,
    });
  };
}

/* istanbul ignore next */
export function corsMiddleware(_req: Request, res: Response, next: NextFunction) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');

  return next();
}
