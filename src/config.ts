import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  LOGGING_LEVEL,
  LOGGING_FORMAT,
  LOGGING_COLORIZE,

  HTTP_ACCESS_LOGGING,

  HTTP_BIND,

  ENVIRONMENT
} = process.env;

const [ HTTP_IP, HTTP_PORT ] = (HTTP_BIND || '0.0.0.0:3000').split(':');

export default {
  logging: {
    level: LOGGING_LEVEL || 'warn',
    format: LOGGING_FORMAT,
    colorize: LOGGING_COLORIZE === 'true'
  },
  app: {
    env: ENVIRONMENT || 'local'
  },
  http: {
    accessLogging: HTTP_ACCESS_LOGGING === 'true',
    port: parseInt(HTTP_PORT, 10) || 3000,
    ip: HTTP_IP || '0.0.0.0'
  }
};
