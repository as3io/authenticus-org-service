const connection = require('../mongoose');
const schema = require('../schema/application');

module.exports = connection.model('application', schema);
