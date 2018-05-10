const redis = require('../common/redis/client');

const { REDIS_CORE_DSN } = process.env;
const client = redis(REDIS_CORE_DSN);

module.exports = client;
