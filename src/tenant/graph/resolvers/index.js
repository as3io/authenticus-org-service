const deepAssign = require('deep-assign');

const common = require('../../../common/graph/resolvers');
const application = require('./application');

module.exports = deepAssign(application, common);
