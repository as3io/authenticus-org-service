const { Schema } = require('mongoose');
const userPlugin = require('../../common/plugins/user');
const tenantRelatablePlugin = require('../../common/plugins/tenant-relatable');

const schema = new Schema({}, {
  timestamps: true,
});

schema.plugin(userPlugin);
schema.plugin(tenantRelatablePlugin);

module.exports = schema;
