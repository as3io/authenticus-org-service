const mongoose = require('../../mongoose');
const schema = require('../../schema/org/role');

module.exports = mongoose.model('role', schema);
