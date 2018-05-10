const { Schema } = require('mongoose');
const appRelatablePlugin = require('../plugins/app-relatable');
const pushIdPlugin = require('../../common/plugins/push-id');
const sluggablePlugin = require('../../common/plugins/sluggable');

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
schema.plugin(appRelatablePlugin);

schema.index({ appId: 1, slug: 1 }, { unique: true });
