const { Schema } = require('mongoose');
const userPlugin = require('../../common/plugins/user');
const orgRelatablePlugin = require('../../common/plugins/org-relatable');

const schema = new Schema({}, {
  timestamps: true,
});

schema.plugin(userPlugin);
schema.plugin(orgRelatablePlugin);

module.exports = schema;
