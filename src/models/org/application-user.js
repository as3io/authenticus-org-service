const mongoose = require('../../mongoose');
const schema = require('../../schema/org/application-user');

module.exports = mongoose.model('org-applicaton-user', schema);
