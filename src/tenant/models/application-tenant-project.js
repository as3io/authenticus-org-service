const connection = require('../mongoose');
const schema = require('../schema/application-tenant-project');

module.exports = connection.model('application-tenant-project', schema);
