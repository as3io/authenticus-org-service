const UserService = require('../../services/user');

module.exports = {
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
  },
};
