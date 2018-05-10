const Application = require('../models/application');

module.exports = function appRelatablePlugin(schema) {
  schema.add({
    appId: {
      type: String,
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
  });

  schema.index({ appId: 1 });
};
