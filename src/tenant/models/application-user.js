const connection = require('../mongoose');
const schema = require('../schema/application-user');

module.exports = connection.model('application-user', schema);
