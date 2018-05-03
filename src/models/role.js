const mongoose = require('../mongoose');
const schema = require('../schema/role');

module.exports = mongoose.model('role', schema);
