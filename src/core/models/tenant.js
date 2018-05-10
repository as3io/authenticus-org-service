const connection = require('../mongoose');
const schema = require('../schema/tenant');

module.exports = connection.model('tenant', schema);
