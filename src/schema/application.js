const { Schema } = require('mongoose');
const pushIdPlugin = require('../plugins/push-id');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  orgId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'organization',
  },
});

schema.plugin(pushIdPlugin);

schema.index({ orgId: 1 });

module.exports = schema;
