import * as util from 'util';
import { Logger } from '../../logger';
import { Exception } from '../../exceptions';

/**
 * @param logger
 */
export function requestLoggerMiddleware(logger: Logger) {
  return (req, res, next) => {
    req.app.locals._requestStartTime = ~~new Date();

    const originalEnd = res.end;
    res.end = (chunk, encoding) => {
      res.end = originalEnd;
      res.end(chunk, encoding);

      logger.info('REQUEST', {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime: ~~new Date() - req.app.locals._requestStartTime,
      });
    };

    next();
  };
}

/**
 * @param logger
 */
export function errorLoggerMiddleware(logger: Logger) {
  return (error: Exception, _req, _res, next) => {
    if (error.httpStatusCode !== 200 && error.httpStatusCode !== 404) {
      logger.error(`Express Error Handler. ${util.inspect(error)}`);
    }
    next(error);
  };
}
