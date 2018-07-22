import * as url from 'url';

import { Dashboard } from "../../domain/ico/dashboard";

export interface StackServiceBuilder {
  buildDeployHelperJSONRequest();
}

export class IcoDashboardStackBuilder implements StackServiceBuilder {
  constructor(protected namespace: string, protected dashboard: Dashboard) {
  }

  buildDeployHelperJSONRequest() {
    const frontend = url.parse(this.dashboard.frontendUrl);
    const backend = url.parse(this.dashboard.backendUrl);
    const dashboard = this.dashboard;
    const settings = this.dashboard.settings;

    // @TODO: Escape values
    return {
      'name': `${this.namespace}_app`,
      'stack': 'app',
      'context': {
        'ingress.frontend.expose': `route://${frontend.hostname}:80${frontend.path}`,
        'services.frontend.image': 'alekns/frontend-ico-dashboard:latest',
        'services.frontend.limits.memory': '1024M',
        'services.frontend.limits.cpus': '1.0',
        'ingress.backend.expose': `route://${backend.hostname}:3000?${backend.path}&limitter=1s,12,16`,
        'services.backend.image': 'alekns/backend-ico-dashboard:latest',
        'services.backend.limits.memory': '1024M',
        'services.backend.limits.cpus': '1.0',
        'services.backend.envs': `
ENVIRONMENT=production
COMPANY_NAME=${dashboard.title}
TOKEN_PRICE_USD=${dashboard.token.priceUsd}
API_URL=${dashboard.backendUrl}
FRONTEND_URL=${dashboard.frontendUrl}

ICO_END_TIMESTAMP=${settings.features.icoEndTimestamp}

MONGO_AUTH_SOURCE=admin
MONGO_REPLICA_SET=replica

SC_ABI_FOLDER=contracts/default
ICO_SC_ADDRESS=${settings.features.icoAddress}
WHITELIST_SC_ADDRESS=${settings.features.whitelistAddress}
TOKEN_ADDRESS=${dashboard.token.address}
WL_OWNER_PK=${settings.features.whitelistPk}
TEST_FUND_PK=

RPC_TYPE=http
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
# KYC_JUMIO_TOKEN_LIFETIME=5184000

# Shufti Pro provider
KYC_SHUFTIPRO_CLIENT_ID=${settings.kyc.settings.clientId}
KYC_SHUFTIPRO_SECRET_KEY=${settings.kyc.settings.secretKey}
KYC_SHUFTIPRO_REDIRECT_URL=${settings.kyc.settings.redirectUrl}
KYC_SHUFTIPRO_CALLBACK_URL=${settings.kyc.settings.callbackUrl}
KYC_SHUFTIPRO_ALLOW_RECREATE_SESSION=${settings.kyc.settings.allowRecreateSession}
KYC_SHUFTIPRO_DEFAULT_PHONE=${settings.kyc.settings.defaultPhone}

ACCESS_LOG=true
LOGGING_LEVEL=debug
  `,
        'construct.tenant_email': 'test@testtest.com',
        'construct.tenant_password': 'aQWERqreRer342',
        'construct.tenant_client': '...',
        'construct.auth_url': 'http://auth:3000',
        'construct.verify_url': 'http://verify:3000',
        'construct.redis_url': 'redis://redis:Werttji5490xVg6r5@redis',
        'construct.mongo_url': 'mongodb://user:Werttj@mongo-1/ico?authSource=admin'
      },
      'links': ['authverify:global_authverify', 'mongo:global_mongo', 'redis:global_redis']
    }
  }
}
// {
//   'name': ''$REDIS_NS'_redis',
//   'stack': 'redis',
//   'context': {
//       'services.redis.limits.memory': '1024M',
//       'construct.type': 'single',
//       'construct.auth_password': 'Werttji5490xVg6r5'
//   },
//   'links': []
// }

// {
//   'name': ''$MONGO_NS'_mongo',
//   'stack': 'mongo',
//   'context': {
//     'services.mongo.limits': '1024M',
//     'services.mongo.cpus': '1.0',
//     'construct.type': 'single',
//     'construct.admin_password': 'qwerty',
//     'construct.dbs': [{'db': 'ico', 'user': 'user', 'password': 'Werttj'}],
//     'construct.shared_key': '123EAABCC12341234123412341234'
//   },
//   'links': []
// }

// {
//   'name': ''$AUTHVERIFY_NS'_authverify',
//   'stack': 'authverify',
//   'context': {
//     'ingress.auth.expose': 'route://auth.com:3000?limitter=1s,4,6,10s,20,30',
//     'services.auth.limits.memory': '1024M',
//     'services.auth.limits.cpus': '1.0',
//     'ingress.verify.expose': 'route://verify.com:3000?limitter=1s,4,6,10s,20,30',
//     'services.verify.limits.memory': '1024M',
//     'services.verify.limits.cpus': '1.0',
//     'construct.jwt_key': 'Qr3r14rewqr9j8j98jrjhjnj54',
//     'construct.redis_url': 'redis://redis:Werttji5490xVg6r5@redis',
//     'construct.mail_provider': 'mailjet',
//     'construct.mail_config': {
//         '*MAILJET_API_KEY': 'e3affab4235dd1bea58b6b39bb26e034',
//         '*MAILJET_API_SECRET': 'ae9a9aa605bfe3244c6d06ed661e7288'
//     },
//     'construct.tls.tenant_ca_cn': 'secrettech.deployav',
//     'construct.tls.tenant_ca': '',
//     'construct.tls.tenant_server': '...'
//   },
//   'links': ['redis:'$REDIS_NS'_redis']
// }
