module.exports = function softDeleteablePlugin(schema) {
  schema.add({
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  });
  schema.index({ deleted: 1 });
};
