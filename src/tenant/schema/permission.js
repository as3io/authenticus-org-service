const { Schema } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  grant: {
    type: Boolean,
    default: false,
    required: true,
  },
});

module.exports = schema;
