const Organization = require('../../models/organization');

module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createOrganization: (root, { input }) => {
      const { payload } = input;
      const doc = new Organization(payload);
      return doc.save();
    },
  },
};
