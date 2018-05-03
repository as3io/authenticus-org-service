const { Schema } = require('mongoose');
const sluggablePlugin = require('../plugins/sluggable');
const Application = require('../models/application');

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
    type: Schema.Types.ObjectId,
    required: true,
    validate: {
      async validator(v) {
        const doc = await Application.findOne({ _id: v }, { _id: 1 });
        if (doc) return true;
        return false;
      },
      message: 'No application found for ID {VALUE}',
    },
  },
}, {
  timestamps: true,
});

schema.plugin(sluggablePlugin, { createFrom: 'name' });

schema.index({ appId: 1, slug: 1 }, { unique: true });

module.exports = schema;
