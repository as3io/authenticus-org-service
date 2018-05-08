const bcrypt = require('bcrypt');
const Session = require('../repos/session');
const UserModel = require('../models/user');

const { ROOT_SESSION_NAMESPACE, ROOT_SESSION_SECRET, ROOT_SESSION_EXPIRES } = process.env;

const sessionRepo = new Session({
  namespace: ROOT_SESSION_NAMESPACE,
  secret: ROOT_SESSION_SECRET,
  expires: ROOT_SESSION_EXPIRES,
});

/**
 * @todo Ensure all user sessions are invalidated on password change.
 */
const UserService = () => Object.create({
  /**
   * Creates a new user.
   *
   * @async
   * @param {object} payload The new user payload.
   * @param {string} payload.email The user's email address.
   * @param {string} payload.password The password.
   * @param {string} payload.givenName The user's first (family) name.
   * @param {string} payload.familyName The user's last (given) name.
   */
  create({
    email,
    password,
    givenName,
    familyName,
  } = {}) {
    const doc = new UserModel({
      email,
      password,
      givenName,
      familyName,
    });
    return doc.save();
  },

  /**
   * Finds a user by the provided email address.
   *
   * @async
   * @param {string} email The user's email address.
   */
  async findByEmail(email) {
    const value = this.normalizeEmail(email);
    if (!value) throw new Error('Unable to find user: no email address was provided.');
    return UserModel.findOne({ email: value });
  },

  /**
   * Finds a user by the provided ID.
   *
   * @async
   * @param {string} id The user id.
   */
  async findById(id) {
    if (!id) throw new Error('Unable to find user: no ID was provided.');
    return UserModel.findOne({ _id: id });
  },

  /**
   * Logs a user in for the provided email and password.
   *
   * @async
   * @param {string} email The user's email address.
   * @param {string} password The cleartext password.
   */
  async login(email, password) {
    // @todo Handle email verification.
    if (!password) throw new Error('Unable to login user. No password was provided.');

    // Load user from database.
    const user = await this.findByEmail(email);
    if (!user) throw new Error('No user was found for the provided email address.');

    // Verify password.
    await this.verifyPassword(password, user.password);

    // Create session.
    const session = await sessionRepo.set(user.id);

    // Update login info
    await this.updateLoginInfo(user);
    return { user, session };
  },

  /**
   * Verifies a clear text password to the encoded value.
   *
   * @async
   * @param {string} clear The cleartext password.
   * @param {string} encoded The bcrypt encoded password.
   */
  async verifyPassword(clear, encoded) {
    const valid = await bcrypt.compare(clear, encoded);
    if (!valid) throw new Error('The provided password was incorrect.');
    return valid;
  },

  /**
   * Retrieves a user session for the provided JWT token.
   *
   * @async
   * @param {string} token The JWT.
   */
  async retrieveSession(token) {
    const session = await sessionRepo.get(token);
    // Ensure user still exists/refresh the user data.
    const user = await this.findById(session.uid);
    if (!user) throw new Error('Unable to retrieve session: the provided user could not be found.');
    return { user, session };
  },

  /**
   * Updates the user login info.
   *
   * @async
   * @param {UserModel} user The user.
   */
  updateLoginInfo(user) {
    user.set('logins', user.get('logins') + 1);
    user.set('lastLoggedInAt', new Date());
    return user.save();
  },

  /**
   * Normalizes the email by trimming and coverting it to lower case.
   *
   * @param {string} email The incoming email address.
   * @return {string}
   */
  normalizeEmail(email) {
    if (!email) return '';
    return String(email).trim().toLowerCase();
  },
});

module.exports = UserService();
