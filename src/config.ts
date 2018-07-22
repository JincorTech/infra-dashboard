import 'reflect-metadata';
import * as dotenv from 'dotenv';

dotenv.config();

const {
  ENVIRONMENT,

  LOGGING_LEVEL,
  LOGGING_FORMAT,
  LOGGING_COLORIZE,

  HTTP_ACCESS_LOGGING,
  HTTP_BIND,

  DEPLOYER_HELPER_URL,

  MONGO_URL,
  MONGO_AUTH_SOURCE,
  MONGO_REPLICA_SET
} = process.env;

const [ HTTP_IP, HTTP_PORT ] = (HTTP_BIND || '0.0.0.0:3000').split(':');

export default {
  app: {
    env: ENVIRONMENT || 'local'
  },
  logging: {
    level: LOGGING_LEVEL || 'warn',
    format: LOGGING_FORMAT,
    colorize: LOGGING_COLORIZE === 'true'
  },
  http: {
    accessLogging: HTTP_ACCESS_LOGGING === 'true',
    port: parseInt(HTTP_PORT, 10) || 3000,
    ip: HTTP_IP || '0.0.0.0'
  },
  deployerHelper: {
    url: DEPLOYER_HELPER_URL
  },
  typeOrm: {
    type: 'mongodb',
    synchronize: true,
    logging: false,
    url: MONGO_URL,
    authSource: MONGO_AUTH_SOURCE,
    replicaSet: MONGO_REPLICA_SET,
    entities: [
      'src/domain/ico/*.ts',
      'dist/domain/ico/*.js'
    ],
    migrations: [
    ],
    subscribers: [
    ]
  },
};
