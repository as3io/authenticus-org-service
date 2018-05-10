const { Pagination, paginationResolvers } = require('@limit0/mongoose-graphql-pagination');
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
  ApplicationConnection: paginationResolvers.connection,

  /**
   *
   */
  ApplicationEdge: paginationResolvers.edge,

  /**
   *
   */
  Query: {
    /**
     *
     */
    application: async (root, { input }, { tenantAuth }) => {
      await tenantAuth.check();
      const { id } = input;
      const record = await Application.findOne({ _id: id, tenantId: tenantAuth.tenant.id });
      if (!record) throw new Error(`No application record found for ID ${id}.`);
      return record;
    },

    /**
     *
     */
    allApplications: async (root, { pagination, sort }, { tenantAuth }) => {
      await tenantAuth.check();
      const criteria = { tenantId: tenantAuth.tenant.id };
      return new Pagination(Application, { pagination, sort, criteria }, {
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
    createApplication: async (root, { input }, { tenantAuth }) => {
      await tenantAuth.check('Owner');
      const { payload } = input;
      payload.tenantId = tenantAuth.tenant.id;
      const doc = new Application(payload);
      return doc.save();
    },
  },
};
