const coreConnection = require('./core/mongoose');
const tenantConnection = require('./tenant/mongoose');

module.exports = { coreConnection, tenantConnection };
