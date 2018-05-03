module.exports = function softDeleteable(schema) {
  schema.add({
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  });
  schema.index({ deleted: 1 });
};
