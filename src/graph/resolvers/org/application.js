const Organization = require('../../../models/organization');
const OrgApplication = require('../../../models/org/application');

module.exports = {
  /**
   *
   */
  OrgApplication: {
    organization: app => Organization.findOne({ _id: app.orgId }),
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createOrgApplication: async (root, { input }, { organization }) => {
      const org = await organization.load();

      const { payload } = input;
      payload.orgId = org.id;
      const doc = new OrgApplication(payload);
      return doc.save();
    },
  },
};
