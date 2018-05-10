const Tenant = require('../../../core/models/tenant');
const Application = require('../../models/application');

module.exports = {
  /**
   *
   */
  Application: {
    tenant: app => Tenant.findOne({ _id: app.tenantId }),
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createApplication: async (root, { input }, { tenantAuth }) => {
      await tenantAuth.check('Owner');
      const { payload } = input;
      payload.tenantId = tenantAuth.tenant.id;
      const doc = new Application(payload);
      return doc.save();
    },
  },
};
