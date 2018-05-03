const { Schema } = require('mongoose');
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

module.exports = schema;
