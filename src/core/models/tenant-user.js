const connection = require('../mongoose');
const schema = require('../schema/tenant-user');

module.exports = connection.model('tenant-user', schema);
