const { Schema } = require('mongoose');
const OrgApplication = require('../../models/org/application');
const OrgUser = require('../../models/org/user');
const OrgRole = require('../../models/org/role');
const pushIdPlugin = require('../../plugins/push-id');

const schema = new Schema({
  userId: {
    type: String,
    required: true,
    validate: {
      async validator(v) {
        const doc = await OrgUser.findOne({ _id: v }, { _id: 1 });
        if (doc) return true;
        return false;
      },
      message: 'No user found for ID {VALUE}',
    },
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
  roleId: {
    type: String,
    required: true,
    validate: {
      async validator(v) {
        const doc = await OrgRole.findOne({ _id: v }, { _id: 1, appId: 1 });
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

schema.plugin(pushIdPlugin);

schema.index({ appId: 1, userId: 1 }, { unique: true });

module.exports = schema;
