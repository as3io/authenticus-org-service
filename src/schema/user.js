const { Schema } = require('mongoose');
const userPlugin = require('../plugins/user');

const schema = new Schema({}, {
  timestamps: true,
});

schema.plugin(userPlugin);

module.exports = schema;
