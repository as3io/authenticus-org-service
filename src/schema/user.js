const { Schema } = require('mongoose');
const userPlugin = require('../plugins/user');

const schema = new Schema({
  logins: {
    type: Number,
    default: 0,
    min: 0,
  },
  lastLoggedInAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

schema.plugin(userPlugin);

module.exports = schema;
