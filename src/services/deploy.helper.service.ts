class StackServiceBuilder {
}

class RedisStackBuilder {
}

class MongoStackBuilder {

}

class AuthVerifyStackBuilder {

}

class IcoDashboardStackBuilder {

}
// {
//   "name": "'$REDIS_NS'_redis",
//   "stack": "redis",
//   "context": {
//       "services.redis.limits.memory": "1024M",
//       "construct.type": "single",
//       "construct.auth_password": "Werttji5490xVg6r5"
//   },
//   "links": []
// }

// {
//   "name": "'$MONGO_NS'_mongo",
//   "stack": "mongo",
//   "context": {
//     "services.mongo.limits": "1024M",
//     "services.mongo.cpus": "1.0",
//     "construct.type": "single",
//     "construct.admin_password": "qwerty",
//     "construct.dbs": [{"db": "ico", "user": "user", "password": "Werttj"}],
//     "construct.shared_key": "123EAABCC12341234123412341234"
//   },
//   "links": []
// }

// {
//   "name": "'$AUTHVERIFY_NS'_authverify",
//   "stack": "authverify",
//   "context": {
//     "ingress.auth.expose": "route://auth.com:3000?limitter=1s,4,6,10s,20,30",
//     "services.auth.limits.memory": "1024M",
//     "services.auth.limits.cpus": "1.0",
//     "ingress.verify.expose": "route://verify.com:3000?limitter=1s,4,6,10s,20,30",
//     "services.verify.limits.memory": "1024M",
//     "services.verify.limits.cpus": "1.0",
//     "construct.jwt_key": "Qr3r14rewqr9j8j98jrjhjnj54",
//     "construct.redis_url": "redis://redis:Werttji5490xVg6r5@redis",
//     "construct.mail_provider": "mailjet",
//     "construct.mail_config": {
//         "*MAILJET_API_KEY": "e3affab4235dd1bea58b6b39bb26e034",
//         "*MAILJET_API_SECRET": "ae9a9aa605bfe3244c6d06ed661e7288"
//     },
//     "construct.tls.tenant_ca_cn": "secrettech.deployav",
//     "construct.tls.tenant_ca": "",
//     "construct.tls.tenant_server": "..."
//   },
//   "links": ["redis:'$REDIS_NS'_redis"]
// }

// {
//   "name": "'$APP_NS'_app",
//   "stack": "app",
//   "context": {
//     "ingress.frontend.expose": "route://'${APP_FRONT_HOST:-invest.stage.jincor.com}':80",
//     "services.frontend.image": "alekns/frontend-ico-dashboard:latest",
//     "services.frontend.limits.memory": "1024M",
//     "services.frontend.limits.cpus": "1.0",
//     "ingress.backend.expose": "route://'${APP_BACK_HOST:-ico-api.stage.jincor.com}':3000?limitter=1s,12,16",
//     "services.backend.image": "alekns/backend-ico-dashboard:latest",
//     "services.backend.limits.memory": "1024M",
//     "services.backend.limits.cpus": "1.0",
//     "services.backend.envs": """
// COMPANY_NAME=Test
// ENVIRONMENT=test
// TOKEN_PRICE_USD=1.0
// API_URL=http://ico-api.stage.jincor.com
// FRONTEND_URL=http://invest.stage.jincor.com

// ICO_END_TIMESTAMP=1517443200

// MONGO_AUTH_SOURCE=admin
// MONGO_REPLICA_SET=replica

// # Smart-contracts
// SC_ABI_FOLDER=contracts/default
// ICO_SC_ADDRESS=0x4be257d468dae409e0b875ebb1569c25cf3b1d59
// ICO_OLD_SC_ADRESSES=
// WHITELIST_SC_ADDRESS=0x3c97c521cc60e3c6bb8b568d36d7d2f7fa2435fb
// TOKEN_ADDRESS=0xae2de83a3894fcbbce560492fad3ca8bbdb6d0da
// WL_OWNER_PK=
// TEST_FUND_PK=

// RPC_TYPE=http
// RPC_ADDRESS=https://rinkeby.infura.io/ujGcHij7xZIyz2afx4h2
// WEB3_RESTORE_START_BLOCK=2015593
// WEB3_BLOCK_OFFSET=200

// DEFAULT_INVEST_GAS=230000

// THROTTLER_INTERVAL=10000

// # Email
// # EMAIL_TEMPLATE_FOLDER=default
// EMAIL_FROM=noreply@icodashboard.space
// EMAIL_REFERRAL=partners@icodashboard.space
// MAIL_DRIVER=mailjet
// # Mailgun provider
// # MAILGUN_DOMAIN=icodashboard.space
// # MAILGUN_API_KEY=key-0123456789

//   # mailjet provider
//   MAILJET_API_KEY=e3affab4235dd1bea58b6b39bb26e034
//   MAILJET_API_SECRET=ae9a9aa605bfe3244c6d06ed661e7288

//   # KYC settings
//   KYC_STATUS_DEFAULT=verified
//   KYC_ENABLED=false
//   KYC_ENABLED=false
//   KYC_PROVIDER=JUMIO

//   # Jumio provider
//   KYC_JUMIO_BASE_URL=http://kyc.example.com
//   KYC_JUMIO_TOKEN=api_token
//   KYC_JUMIO_SECRET=api_secret
//   # KYC_JUMIO_TOKEN_LIFETIME=5184000

//   # Shufti Pro provider
//   KYC_SHUFTIPRO_CLIENT_ID=CLIENTID
//   KYC_SHUFTIPRO_SECRET_KEY=SECRETKEY
//   KYC_SHUFTIPRO_REDIRECT_URL=http://localhost
//   KYC_SHUFTIPRO_CALLBACK_URL=http://localhost
//   KYC_SHUFTIPRO_ALLOW_RECREATE_SESSION=false
//   KYC_SHUFTIPRO_DEFAULT_PHONE=+440000000000

//   ACCESS_LOG=true
//   LOGGING_LEVEL=debug
//   ",
//     "construct.tenant_email": "test@testtest.com",
//     "construct.tenant_password": "aQWERqreRer342",
//     "construct.tenant_client": "...",
//     "construct.auth_url": "http://auth:3000",
//     "construct.verify_url": "http://verify:3000",
//     "construct.redis_url": "redis://redis:Werttji5490xVg6r5@redis",
//     "construct.mongo_url": "mongodb://user:Werttj@mongo-1/ico?authSource=admin"
//   },
//   "links": ["authverify:'$AUTHVERIFY_NS'_authverify", "mongo:'$MONGO_NS'_mongo", "redis:'$REDIS_NS'_redis"]
// }
}
