const mongoose = require('../mongoose');
const schema = require('../schema/application-role');

module.exports = mongoose.model('application-role', schema);
