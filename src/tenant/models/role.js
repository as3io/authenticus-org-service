const connection = require('../mongoose');
const schema = require('../schema/role');

module.exports = connection.model('role', schema);
