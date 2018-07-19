import * as winston from 'winston';
import { createLogger, configure, format, transports } from 'winston';

import config from './config';

const { combine, timestamp, label, simple } = format;

configure({
  level: config.logging.level,
  transports: getWinstonConfiguredTransports()
});

/**
 * Get default transports.
 */
export function getWinstonConfiguredTransports() {
  return [new transports.Console()];
}

/**
 * Simple logger with tags.
 */
export interface SubLogger {
  addMeta(meta: { [k: string]: any; }): SubLogger;
  debug(msg: string, ...meta: any[]);
  verbose(msg: string, ...meta: any[]);
  info(msg: string, ...meta: any[]);
  warn(msg: string, ...meta: any[]);
  error(msg: string, ...meta: any[]);
}

interface Meta {
  [k: string]: any;
}

/**
 * Logger.
 */
export class Logger {
  protected static loggers: { [k: string]: Logger } = {};
  protected logger: any;

  /**
   * @param name
   */
  static get(name: string = ''): Logger {
    if (Logger.loggers[name]) {
      return Logger.loggers[name];
    }

    let specFormat = combine(
      label({ label: name }),
      timestamp(),
      format.splat(),
      simple()
    );

    if (config.logging.format === 'json') {
      specFormat = combine(specFormat, format.json());
    }

    Logger.loggers[name] = new Logger();
    Logger.loggers[name].logger = createLogger({
      level: config.logging.level,
      format: specFormat,
      transports: getWinstonConfiguredTransports()
    });

    return Logger.loggers[name];
  }

  /**
   * @param args
   */
  debug(...args): winston.Logger {
    return this.logger.debug(...args);
  }

  /**
   * @param args
   */
  verbose(...args): winston.Logger {
    return this.logger.verbose(...args);
  }

  /**
   * @param args
   */
  info(...args): winston.Logger {
    return this.logger.info(...args);
  }

  /**
   * @param args
   */
  warn(...args): winston.Logger {
    return this.logger.warn(...args);
  }

  /**
   * @param args
   */
  error(...args): winston.Logger {
    return this.logger.error(...args);
  }

  /**
   * @param initialMeta
   */
  addMeta(initialMeta?: Meta): SubLogger {
    const meta = initialMeta ? { ...initialMeta } : undefined;
    return {
      addMeta: assignMeta => {
        return this.addMeta({ ...assignMeta, ...meta });
      },
      debug: (msg, ...customMeta) => {
        return this.debug(msg, ...customMeta, meta);
      },
      verbose: (msg, ...customMeta) => {
        return this.verbose(msg, ...customMeta, meta);
      },
      info: (msg, ...customMeta) => {
        return this.info(msg, ...customMeta, meta);
      },
      warn: (msg, ...customMeta) => {
        return this.warn(msg, ...customMeta, meta);
      },
      error: (msg, ...customMeta) => {
        return this.error(msg, ...customMeta, meta);
      }
    };
  }
}
