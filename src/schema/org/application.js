const { Schema } = require('mongoose');
const uuid = require('uuid/v4');
const pushIdPlugin = require('../../plugins/push-id');
const sluggablePlugin = require('../../plugins/sluggable');
const orgRelatablePlugin = require('../../plugins/org-relatable');

const sessionSettingsSchema = new Schema({
  namespace: {
    type: String,
    required: true,
    default() {
      return uuid();
    },
  },
  secret: {
    type: String,
    required: true,
    default() {
      return uuid();
    },
  },
  expires: {
    type: Number,
    required: true,
    min: 60,
    max: 60 * 60 * 24 * 365,
    default() {
      return 60 * 60 * 24;
    },
  },
});

const settingsSchema = new Schema({
  session: {
    type: sessionSettingsSchema,
    required: true,
    default: {},
  },
});

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
  settings: {
    type: settingsSchema,
    required: true,
    default: {},
  },
}, {
  timestamps: true,
});

schema.plugin(orgRelatablePlugin);
schema.plugin(pushIdPlugin);
schema.plugin(sluggablePlugin, { createFrom: 'name' });

schema.index({ slug: 1 }, { unique: true });

module.exports = schema;
