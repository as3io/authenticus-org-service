const mongoose = require('../mongoose');
const schema = require('../schema/application');

module.exports = mongoose.model('application', schema);
