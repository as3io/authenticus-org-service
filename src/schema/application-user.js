const { Schema } = require('mongoose');
const Application = require('../models/application');
const User = require('../models/user');
const Role = require('../models/role');

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
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
  roleId: {
    type: Schema.Types.ObjectId,
    required: true,
    validate: {
      async validator(v) {
        const doc = await Role.findOne({ _id: v }, { _id: 1, appId: 1 });
        if (!doc) return false;
        return this.appId.toString() === doc.appId.toString();
      },
      message: 'Invalid role for ID {VALUE}',
    },
  },
  logins: {
    type: Number,
    default: 0,
    min: 0,
  },
  lastLoggedInAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

schema.index({ appId: 1, userId: 1 }, { unique: true });

module.exports = schema;
