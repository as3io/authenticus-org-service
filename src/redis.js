const coreClient = require('./core/redis');
const tenantClient = require('./tenant/redis');

module.exports = { coreClient, tenantClient };
