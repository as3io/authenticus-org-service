const { Schema } = require('mongoose');
const userPlugin = require('../../common/plugins/user');

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

schema.index({ email: 1 }, { unique: true });

schema.plugin(userPlugin);

module.exports = schema;
