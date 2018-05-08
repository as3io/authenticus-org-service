const Organization = require('../../models/organization');
const User = require('../../models/user');

module.exports = {
  /**
   *
   */
  Organization: {
    owner: organization => User.findOne({ _id: organization.owningUserId }),
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createOrganization: (root, { input }, { auth }) => {
      auth.check();
      const { payload } = input;
      payload.owningUserId = auth.user.id;
      const doc = new Organization(payload);
      return doc.save();
    },
  },
};
