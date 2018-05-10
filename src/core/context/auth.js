
const Auth = ({ user, session, error }) => Object.freeze({
  get user() {
    return user;
  },

  get session() {
    return session;
  },

  /**
   *
   */
  isValid() {
    const e = this.getError();
    if (e) return false;
    return true;
  },

  /**
   *
   */
  getError() {
    if (error) return error instanceof Error ? error : new Error(error);
    if (!this.session || !this.user) return new Error('No user or session was found.');
    return this.session.uid !== this.user.id ? new Error('Session-user mismatch encountered.') : null;
  },

  /**
   *
   */
  check() {
    if (!this.isValid()) throw new Error('You must be logged-in to access this resource.');
  },
});

module.exports = Auth;
