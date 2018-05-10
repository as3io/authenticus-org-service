const connection = require('../mongoose');
const schema = require('../schema/organization');

module.exports = connection.model('organization', schema);
