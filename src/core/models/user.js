const connection = require('../mongoose');
const schema = require('../schema/user');

module.exports = connection.model('user', schema);
