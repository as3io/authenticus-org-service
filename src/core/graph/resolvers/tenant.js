const { Pagination, paginationResolvers } = require('@limit0/mongoose-graphql-pagination');
const Tenant = require('../../models/tenant');
const TenantUser = require('../../models/tenant-user');
const User = require('../../models/user');

module.exports = {
  /**
   *
   */
  Tenant: {
    users: tenant => TenantUser.find({ tenantId: tenant.id }),
  },

  TenantUser: {
    user: tenantUser => User.findOne({ _id: tenantUser.userId }),
  },

  /**
   *
   */
  TenantConnection: paginationResolvers.connection,

  /**
   *
   */
  TenantEdge: paginationResolvers.edge,

  /**
   *
   */
  Query: {
    /**
     *
     */
    tenant: async (root, { input }, { auth }) => {
      auth.check();
      const { id } = input;
      const record = await Tenant.findOne({ _id: id, owningUserId: auth.user.id });
      if (!record) throw new Error(`No tenant record found for ID ${id}.`);
      return record;
    },

    /**
     *
     */
    allTenants: (root, { pagination, sort }, { auth }) => {
      auth.check();
      const criteria = { owningUserId: auth.user.id };
      return new Pagination(Tenant, { pagination, sort, criteria });
    },
  },

  /**
   *
   */
  Mutation: {
    /**
     *
     */
    createTenant: async (root, { input }, { auth }) => {
      auth.check();
      const { payload } = input;
      const tenant = await Tenant.create(payload);
      await TenantUser.create({
        userId: auth.user.id,
        tenantId: tenant.id,
        role: 'Owner',
      });
      return tenant;
    },
  },
};
