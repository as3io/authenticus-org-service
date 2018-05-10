const redis = require('../common/redis/client');

const { REDIS_TENANT_DSN } = process.env;
const client = redis(REDIS_TENANT_DSN);

module.exports = client;
