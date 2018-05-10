const { Schema } = require('mongoose');
const pushIdPlugin = require('../../common/plugins/push-id');
const sluggablePlugin = require('../../common/plugins/sluggable');

const userSettingsSchema = new Schema({
  pwdSaltRounds: {
    type: Number,
    required: true,
    min: 8,
    max: 15,
    default: 10,
    set(v) {
      return parseInt(v, 10);
    },
  },
  requireEmailConfirmation: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const settingsSchema = new Schema({
  user: {
    type: userSettingsSchema,
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

schema.plugin(pushIdPlugin);
schema.plugin(sluggablePlugin, { createFrom: 'name' });

schema.index({ owningUserId: 1, slug: 1 }, { unique: true });
schema.index({ name: 1, _id: 1 }, { unique: true });
schema.index({ name: -1, _id: -1 }, { unique: true });
schema.index({ updatedAt: 1, _id: 1 }, { unique: true });
schema.index({ updatedAt: -1, _id: -1 }, { unique: true });

module.exports = schema;
