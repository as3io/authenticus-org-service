const slug = require('slug');
const { AllHtmlEntities } = require('html-entities');
const softDeleteablePlugin = require('./soft-deleteable');

const entities = new AllHtmlEntities();

module.exports = function sluggablePlugin(schema, options) {
  const hasOption = name => options && options[name];

  schema.add({
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: !hasOption('softDeleteable'),
    },
  });
  if (hasOption('softDeleteable')) {
    schema.plugin(softDeleteablePlugin);
    schema.index({ slug: 1 }, {
      unique: true,
      partialFilterExpression: { deleted: false },
    });
  }

  schema.pre('save', function setSlug(done) {
    if (!hasOption('createFrom')) throw new Error('You must specify which field to create the slug from.');
    const { createFrom } = options;
    const decoded = entities.decode(decodeURIComponent(this[createFrom]));
    this.slug = slug(decoded.trim(), { lower: true });
    done();
  });
};
