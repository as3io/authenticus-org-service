const mongoose = require('../../mongoose');
const schema = require('../../schema/org/user');

module.exports = mongoose.model('org-user', schema);
