const deepAssign = require('deep-assign');

const common = require('../../../common/graph/resolvers');
const user = require('./user');
const tenant = require('./tenant');

module.exports = deepAssign(user, tenant, common);
