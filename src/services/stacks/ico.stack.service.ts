import * as url from 'url';

import { Dashboard } from "../../domain/ico/dashboard";

export interface StackServiceBuilder {
  buildDeployHelperJSONRequest();
}

export class IcoDashboardStackBuilder implements StackServiceBuilder {
  protected mongoUrl: string;
  protected redisUrl: string;
  protected authUrl: string;
  protected verifyUrl: string;
  protected loggingLevel: string;
  protected links: string[];
  protected constructAuth: {};

  constructor(protected dashboard: Dashboard, protected namespace: string, loggingLevel: string) {
    this.loggingLevel = loggingLevel || 'debug';
  }

  setMongo(mongoUrl: string, linksTo?: string) {
    this.mongoUrl = mongoUrl || (`mongodb://mongo/${this.namespace}?authSource=admin`);
    if (linksTo) {
      this.links.push('mongo:' + linksTo);
    }
  }

  setRedis(redisUrl: string, linksTo?: string) {
    this.redisUrl = redisUrl || 'redis://redis';
    if (linksTo) {
      this.links.push('redis:' + linksTo);
    }
  }

  setAuthverify(authUrl: string, verifyUrl: string, linksTo?: string) {
    this.authUrl = authUrl || 'http://auth:3000';
    this.verifyUrl = verifyUrl || 'http://verify:3000';
    if (linksTo) {
      this.links.push('authverify:' + linksTo);
    }
  }

  setAuthAccess(authJwt?: string, newTenant?: {
    tenantEmail: string;
    tenantPassword: string;
    tenantClient: string;
  }) {
    if (authJwt) {
      this.constructAuth = { 'construct.auth_jwt': authJwt };
    } else {
      this.constructAuth = {
        'construct.tenant_email': newTenant.tenantEmail,
        'construct.tenant_password': newTenant.tenantPassword,
        'construct.tenant_client': newTenant.tenantClient
      };
    }
  }

  buildDeployHelperJSONRequest() {
    const frontend = url.parse(this.dashboard.frontendUrl);
    const backend = url.parse(this.dashboard.backendUrl);

    return {
      'name': `${this.namespace}_app`,
      'stack': 'app',
      'context': {
        'ingress.frontend.expose': `route://${frontend.hostname}:80${frontend.path}`,
        'services.frontend.image': 'alekns/frontend-ico-dashboard:latest',
        'services.frontend.limits.memory': '1024M',
        'services.frontend.limits.cpus': '1.0',
        'ingress.backend.expose': `route://${backend.hostname}:3000${backend.path}?limitter=1s,8,12,10s,30,40`,
        'services.backend.image': 'alekns/backend-ico-dashboard:latest',
        'services.backend.limits.memory': '1024M',
        'services.backend.limits.cpus': '1.0',
        'services.backend.envs': this.buildEnvFile(),
        ...this.constructAuth,
        'construct.auth_url': this.authUrl,
        'construct.verify_url': this.verifyUrl,
        'construct.redis_url': this.redisUrl,
        'construct.mongo_url': this.mongoUrl
      },
      'links': this.links
    }
  }

  buildEnvFile() {
    const dashboard = this.dashboard;
    const settings = this.dashboard.settings;
    const blockchainNode = url.parse(this.dashboard.settings.blockchain.nodeUrl);
    const blockchainNodeSchema = (blockchainNode.protocol || 'http:').slice(0, -1);

    // @TODO: Escape values
    return `
ENVIRONMENT=production
COMPANY_NAME=${dashboard.title}
API_URL=${dashboard.backendUrl}
FRONTEND_URL=${dashboard.frontendUrl}

ICO_END_TIMESTAMP=${settings.features.icoEndTimestamp}

MONGO_AUTH_SOURCE=admin
MONGO_REPLICA_SET=replica

SC_ABI_FOLDER=contracts/default
ICO_SC_ADDRESS=${settings.features.icoAddress}
TOKEN_ADDRESS=${dashboard.token.address}
TOKEN_PRICE_USD=${dashboard.token.priceUsd}
WHITELIST_SC_ADDRESS=${settings.features.whitelistAddress}
WL_OWNER_PK=${settings.features.whitelistPk}
TEST_FUND_PK=

RPC_TYPE=${blockchainNodeSchema}
RPC_ADDRESS=${settings.blockchain.nodeUrl}
WEB3_RESTORE_START_BLOCK=${settings.blockchain.ethStartScanBlock}
WEB3_BLOCK_OFFSET=200

DEFAULT_INVEST_GAS=${settings.blockchain.defaultInvestGas}

THROTTLER_INTERVAL=20000

EMAIL_TEMPLATE_FOLDER=${settings.email.templateFolder}
EMAIL_FROM=${settings.email.emailFrom}
EMAIL_REFERRAL=${settings.email.emailReferral}
MAIL_DRIVER=${settings.email.provider}

# Mailgun provider
MAILGUN_DOMAIN=${settings.email.settings.domain}
MAILGUN_API_KEY=${settings.email.settings.apiKey}

# mailjet provider
MAILJET_API_KEY=${settings.email.settings.apiKey}
MAILJET_API_SECRET=${settings.email.settings.apiSecret}

# KYC settings
KYC_STATUS_DEFAULT=${settings.kyc.defaultStatus}
KYC_ENABLED=${settings.kyc.enabled}
KYC_PROVIDER=${settings.kyc.provider}

# Jumio provider
KYC_JUMIO_BASE_URL=${settings.kyc.settings.baseUrl}
KYC_JUMIO_TOKEN=${settings.kyc.settings.token}
KYC_JUMIO_SECRET=${settings.kyc.settings.secret}
KYC_JUMIO_TOKEN_LIFETIME=${settings.kyc.settings.tokenLifetime}

# Shufti Pro provider
KYC_SHUFTIPRO_CLIENT_ID=${settings.kyc.settings.clientId}
KYC_SHUFTIPRO_SECRET_KEY=${settings.kyc.settings.secretKey}
KYC_SHUFTIPRO_REDIRECT_URL=${settings.kyc.settings.redirectUrl}
KYC_SHUFTIPRO_CALLBACK_URL=${settings.kyc.settings.callbackUrl}
KYC_SHUFTIPRO_ALLOW_RECREATE_SESSION=${settings.kyc.settings.allowRecreateSession}
KYC_SHUFTIPRO_DEFAULT_PHONE=${settings.kyc.settings.defaultPhone}

ACCESS_LOG=true
LOGGING_LEVEL=${this.loggingLevel}`;
  }
}
