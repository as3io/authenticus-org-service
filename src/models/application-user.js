const mongoose = require('../mongoose');
const schema = require('../schema/application-user');

module.exports = mongoose.model('application-user', schema);
