const { Pagination, paginationResolvers } = require('@limit0/mongoose-graphql-pagination');
const TenantUser = require('../../models/user');

module.exports = {
  /**
   *
   */
  TenantUserConnection: paginationResolvers.connection,

  /**
   *
   */
  TenantUserEdge: paginationResolvers.edge,

  /**
   *
   */
  Query: {
    /**
     *
     */
    tenantUser: async (root, { input }, { tenantAuth }) => {
      await tenantAuth.check();
      const { id } = input;
      const record = await TenantUser.findOne({ _id: id, tenantId: tenantAuth.tenant.id });
      if (!record) throw new Error(`No tenant user record found for ID ${id}.`);
      return record;
    },

    /**
     *
     */
    allTenantUsers: async (root, { pagination, sort }, { tenantAuth }) => {
      await tenantAuth.check();
      const criteria = { tenantId: tenantAuth.tenant.id };
      return new Pagination(TenantUser, { pagination, sort, criteria }, {
        sort: { createdField: 'createdAt' },
      });
    },
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createTenantUser: async (root, { input }, { tenantAuth }) => {
      await tenantAuth.check('Owner');
      const { payload } = input;
      payload.tenantId = tenantAuth.tenant.id;
      return TenantUser.create(payload);
    },
  },
};
