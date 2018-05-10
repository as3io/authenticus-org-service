const { Schema } = require('mongoose');
const pushIdPlugin = require('../../common/plugins/push-id');
const sluggablePlugin = require('../../common/plugins/sluggable');
const ApplicationTenant = require('../models/application-tenant');

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
  appTenantId: {
    type: String,
    required: true,
    validate: {
      async validator(v) {
        const doc = await ApplicationTenant.findOne({ _id: v }, { _id: 1 });
        if (doc) return true;
        return false;
      },
      message: 'No application tenant found for ID {VALUE}',
    },
  },
}, {
  timestamps: true,
});

schema.plugin(pushIdPlugin);
schema.plugin(sluggablePlugin, { createFrom: 'name' });

schema.index({ appId: 1, slug: 1 }, { unique: true });
