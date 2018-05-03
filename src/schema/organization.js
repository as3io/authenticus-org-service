const { Schema } = require('mongoose');
const pushIdPlugin = require('../plugins/push-id');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

schema.plugin(pushIdPlugin);

module.exports = schema;
