const { Schema } = require('mongoose');
const User = require('../models/user');
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
  owningUserId: {
    type: String,
    required: true,
    validate: {
      async validator(v) {
        const doc = await User.findOne({ _id: v }, { _id: 1 });
        if (doc) return true;
        return false;
      },
      message: 'No user found for ID {VALUE}',
    },
  },
}, {
  timestamps: true,
});

schema.plugin(pushIdPlugin);
schema.plugin(sluggablePlugin, { createFrom: 'name' });

schema.index({ slug: 1 }, { unique: true });

module.exports = schema;
