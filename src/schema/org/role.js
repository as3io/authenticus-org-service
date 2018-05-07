const { Schema } = require('mongoose');
const sluggablePlugin = require('../../plugins/sluggable');
const pushIdPlugin = require('../../plugins/push-id');
const OrgApplication = require('../../models/org/application');

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
  appId: {
    type: String,
    required: true,
    validate: {
      async validator(v) {
        const doc = await OrgApplication.findOne({ _id: v }, { _id: 1 });
        if (doc) return true;
        return false;
      },
      message: 'No application found for ID {VALUE}',
    },
  },
}, {
  timestamps: true,
});

schema.plugin(pushIdPlugin);
schema.plugin(sluggablePlugin, { createFrom: 'name' });

schema.index({ appId: 1, slug: 1 }, { unique: true });

module.exports = schema;