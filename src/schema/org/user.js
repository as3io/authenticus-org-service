const { Schema } = require('mongoose');
const userPlugin = require('../../plugins/user');
const orgRelatablePlugin = require('../../plugins/org-relatable');

const schema = new Schema({}, {
  timestamps: true,
});

schema.plugin(userPlugin);
schema.plugin(orgRelatablePlugin);

module.exports = schema;
