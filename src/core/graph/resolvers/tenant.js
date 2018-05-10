const { Pagination, paginationResolvers } = require('@limit0/mongoose-graphql-pagination');
const Tenant = require('../../models/tenant');
const User = require('../../models/user');

module.exports = {
  /**
   *
   */
  Tenant: {
    owner: tenant => User.findOne({ _id: tenant.owningUserId }),
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
    createTenant: (root, { input }, { auth }) => {
      auth.check();
      const { payload } = input;
      payload.owningUserId = auth.user.id;
      const doc = new Tenant(payload);
      return doc.save();
    },
  },
};
