const { Schema } = require('mongoose');
const Application = require('../models/application');
const Role = require('../models/user');

const schema = new Schema({
  roleId: {
    type: Schema.Types.ObjectId,
    required: true,
    validate: {
      async validator(v) {
        const doc = await Role.findOne({ _id: v }, { _id: 1 });
        if (doc) return true;
        return false;
      },
      message: 'No role found for ID {VALUE}',
    },
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

module.exports = schema;
