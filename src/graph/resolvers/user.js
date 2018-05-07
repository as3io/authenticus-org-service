const User = require('../../models/user');

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
      const doc = new User(payload);
      return doc.save();
    },
  },
};
