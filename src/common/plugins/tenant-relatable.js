const Tenant = require('../../core/models/tenant');

module.exports = function tenantRelatablePlugin(schema) {
  schema.add({
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
  });

  schema.index({ tenantId: 1 });
};
