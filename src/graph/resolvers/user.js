const UserService = require('../../services/user');

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
  },
};
