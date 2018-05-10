const connection = require('../mongoose');
const schema = require('../schema/application-tenant');

module.exports = connection.model('application-tenant', schema);
