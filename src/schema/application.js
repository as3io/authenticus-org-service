const { Schema } = require('mongoose');
const pushIdPlugin = require('../plugins/push-id');
const sluggablePlugin = require('../plugins/sluggable');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

schema.plugin(sluggablePlugin, { softDeleteable: true, createFrom: 'name' });
schema.plugin(pushIdPlugin);

module.exports = schema;
