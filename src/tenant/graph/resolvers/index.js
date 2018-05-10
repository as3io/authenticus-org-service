const deepAssign = require('deep-assign');

const common = require('../../../common/graph/resolvers');
const application = require('./application');
const user = require('./user');

module.exports = deepAssign(application, user, common);
