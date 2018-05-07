const { Schema } = require('mongoose');
const pushIdPlugin = require('../plugins/push-id');
const sluggablePlugin = require('../plugins/sluggable');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

schema.plugin(pushIdPlugin);
schema.plugin(sluggablePlugin, { createFrom: 'name' });

schema.index({ slug: 1 }, { unique: true });

module.exports = schema;