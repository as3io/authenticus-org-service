const User = require('../../models/user');

module.exports = {
  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createTenantUser: async (root, { input }, { tenantAuth }) => {
      await tenantAuth.check();
      const { payload } = input;
      payload.tenantId = tenantAuth.tenant.id;
      return User.create(payload);
    },
  },
};
