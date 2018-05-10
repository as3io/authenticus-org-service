const connection = require('../mongoose');
const schema = require('../schema/permission');

module.exports = connection.model('permission', schema);
