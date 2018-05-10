const slug = require('slug');
const { AllHtmlEntities } = require('html-entities');

const entities = new AllHtmlEntities();

module.exports = function sluggablePlugin(schema, options) {
  schema.add({
    slug: {
      type: String,
      required: true,
      trim: true,
    },
  });

  schema.pre('validate', function setSlug(done) {
    if (!options || !options.createFrom) throw new Error('You must specify which field to create the slug from.');
    const { createFrom } = options;
    const decoded = entities.decode(decodeURIComponent(this[createFrom]));
    this.slug = slug(decoded.trim(), { lower: true });
    done();
  });
};
