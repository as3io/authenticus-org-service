const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const crypto = require('crypto');
const pushIdPlugin = require('../../plugins/push-id');
const orgRelatablePlugin = require('../../plugins/org-relatable');

const schema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [
      {
        validator(email) {
          return validator.isEmail(email);
        },
        message: 'Invalid email address {VALUE}',
      },
    ],
  },
  givenName: {
    type: String,
    required: true,
    trim: true,
  },
  familyName: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  photoURL: {
    type: String,
    trim: true,
    validate: {
      validator(v) {
        if (!v) return true;
        return validator.isURL(v, {
          protocols: ['http', 'https'],
          require_protocol: true,
        });
      },
      message: 'Invalid photo URL: {VALUE}',
    },
  },
}, {
  timestamps: true,
});

schema.plugin(orgRelatablePlugin);
schema.plugin(pushIdPlugin);

/**
 * Indexes
 */
schema.index({ email: 1 }, { unique: true });

/**
 * Hooks.
 */
schema.pre('save', function setPassword(next) {
  if (!this.isModified('password')) {
    next();
  } else {
    bcrypt.hash(this.password, 13).then((hash) => {
      this.password = hash;
      next();
    }).catch(next);
  }
});
schema.pre('save', function setPhotoURL(next) {
  if (!this.photoURL) {
    const hash = crypto.createHash('md5').update(this.email).digest('hex');
    this.photoURL = `https://www.gravatar.com/avatar/${hash}`;
  }
  next();
});

module.exports = schema;
