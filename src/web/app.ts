import * as http from 'http';
import * as util from 'util';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import { Container } from 'inversify';

import config from '../config';
import { Logger } from '../logger';
import {
  corsMiddleware,
  contentMiddleware,
  notFoundRouteMiddleware,
  errorHandlerMiddleware
} from './middlewares/request.common';
import {
  requestLoggerMiddleware,
  errorLoggerMiddleware
} from './middlewares/request.logger';
import { InversifyExpressServer } from 'inversify-express-utils';
import { createConnection, ConnectionOptions } from 'typeorm';
import { resolve } from 'url';

const logger = Logger.get('Process');

process.on('uncaughtException', err => {
  logger.error(
    `Stop process. Uncaught Exception. Reason: ${util.inspect(err)}`
  );
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logger.error(
    `Stop process. Unhandled Promise Rejection. Reason: ${util.inspect(reason)}`
  );
  process.exit(1);
});

/**
 * Application.
 */
export default class Application {
  protected logger: Logger = Logger.get('Application');

  constructor(protected container: Container) {
  }

  /**
   *
   */
  buildApplication() {
    const inversifyExpress = new InversifyExpressServer(this.container);

    inversifyExpress.setConfig((expressApp) => {
      this.configureExpress(expressApp);
    });

    inversifyExpress.setErrorConfig((expressApp) => {
      this.configureExpressErrors(expressApp);
    });

    return inversifyExpress.build();
  }
  /**
   *
   */
  configureExpress(expressApp) {
    expressApp.disable('x-powered-by');

    expressApp.use(contentMiddleware);
    expressApp.use(helmet());
    expressApp.use(corsMiddleware);
    if (config.http.accessLogging) {
      expressApp.use(requestLoggerMiddleware(this.logger));
    }
    expressApp.use(bodyParser.json());
    expressApp.use(bodyParser.urlencoded({ extended: false }));
  }

  /**
   *
   * @param expressApp
   */
  configureExpressErrors(expressApp) {
    expressApp.use(notFoundRouteMiddleware());

    expressApp.use(errorLoggerMiddleware(this.logger));
    expressApp.use(errorHandlerMiddleware());
  }

  /**
   *
   */
  async serveHttp() {
    this.logger.debug('Create HTTP server...');
    const httpServer = http.createServer(this.buildApplication());

    httpServer.listen(config.http.port, config.http.ip);
    this.logger.info('Listen HTTP on %s:%s', config.http.ip, config.http.port);

    return new Promise((resolve, reject) => {
      httpServer.on('close', () => {
        resolve();
      });
      httpServer.on('error', (err: Error) => {
        reject(err);
      });
    });
  }

  /**
   *
   */
  async run() {
    await createConnection(config.typeOrm as ConnectionOptions);
    await this.serveHttp();
  }
}
