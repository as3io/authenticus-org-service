const UserService = require('../../services/user');

/**
 * @todo This function should likely move to the user service.
 */
const validatePassword = (value, confirm) => {
  if (!value || !confirm) throw new Error('You must provide and confirm your password.');
  if (value.length < 6) throw new Error('Passwords must be at least six characters long.');
  if (value !== confirm) throw new Error('The password does not match the confirmation password.');
};

module.exports = {
  /**
   *
   */
  Query: {
    /**
     *
     */
    checkSession: async (root, { input }) => {
      const { token } = input;
      const { user, session } = await UserService.retrieveSession(token);
      return { user, session };
    },
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createUser: (root, { input }) => {
      const { payload } = input;
      return UserService.create(payload);
    },

    /**
     *
     */
    loginUser: (root, { input }) => {
      const { email, password } = input;
      return UserService.login(email, password);
    },

    /**
     *
     */
    deleteSession: async (root, args, { auth }) => {
      auth.check();
      const { id, uid } = auth.session;
      await UserService.deleteSession(id, uid);
      return 'ok';
    },

    /**
     *
     */
    changeUserPassword: async (root, { input }, { auth }) => {
      auth.check();
      const { user } = auth;
      const { id, value, confirm } = input;
      if (user.id.valueOf() === id) {
        validatePassword(value, confirm);
        const record = await UserService.findById(id);
        if (!record) throw new Error(`No user record found for ID ${id}.`);
        record.password = value;
        // @todo Invalidate all existing sessions for this user.
        return record.save();
      }
      throw new Error('Only administrators can change passwords for other users.');
    },

    /**
     *
     */
    updateCurrentUserProfile: async (root, { input }, { auth }) => {
      auth.check();
      const { givenName, familyName } = input;
      const { user } = auth;
      user.set({ givenName, familyName });
      return user.save();
    },
  },
};
