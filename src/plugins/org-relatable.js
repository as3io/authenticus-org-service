const Organization = require('../models/organization');

module.exports = function orgRelatablePlugin(schema) {
  schema.add({
    orgId: {
      type: String,
      required: true,
      validate: {
        async validator(v) {
          const doc = await Organization.findOne({ _id: v }, { _id: 1 });
          if (doc) return true;
          return false;
        },
        message: 'No organization found for ID {VALUE}',
      },
    },
  });

  schema.index({ orgId: 1 });
};
