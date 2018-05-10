const { Schema } = require('mongoose');
const User = require('../models/user');
const Tenant = require('../models/tenant');

const schema = new Schema({
  tenantId: {
    type: String,
    required: true,
    validate: {
      async validator(v) {
        const doc = await Tenant.findOne({ _id: v }, { _id: 1 });
        if (doc) return true;
        return false;
      },
      message: 'No tenant found for ID {VALUE}',
    },
  },
  userId: {
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
  role: {
    type: String,
    required: true,
    default: 'Member',
    enum: ['Owner', 'Member'],
  },
}, {
  timestamps: true,
});

schema.index({ tenantId: 1, userId: 1, role: 1 }, { unique: true });

module.exports = schema;
