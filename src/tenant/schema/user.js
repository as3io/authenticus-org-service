const { Schema } = require('mongoose');
const userPlugin = require('../../common/plugins/user');
const tenantRelatablePlugin = require('../../common/plugins/tenant-relatable');

const schema = new Schema({}, {
  timestamps: true,
});

schema.index({ tenantId: 1, email: 1 }, { unique: true });

schema.plugin(userPlugin);
schema.plugin(tenantRelatablePlugin);

module.exports = schema;
