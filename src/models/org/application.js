const mongoose = require('../../mongoose');
const schema = require('../../schema/org/application');

module.exports = mongoose.model('org-application', schema);
