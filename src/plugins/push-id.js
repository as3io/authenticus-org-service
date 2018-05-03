const pushId = require('unique-push-id');

module.exports = function pushIdPlugin(schema) {
  schema.add({
    pushId: {
      type: String,
      required: true,
      default() {
        return pushId();
      },
      validate: {
        validator(v) {
          return /^[a-z0-9-_]{20}$/i.test(v);
        },
        message: 'Invalid push identifier: {VALUE}',
      },
    },
  });
};
