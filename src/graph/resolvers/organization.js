const { Pagination, paginationResolvers } = require('@limit0/mongoose-graphql-pagination');
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
  OrganizationConnection: paginationResolvers.connection,

  /**
   *
   */
  OrganizationEdge: paginationResolvers.edge,

  /**
   *
   */
  Query: {
    /**
     *
     */
    organization: async (root, { input }, { auth }) => {
      auth.check();
      const { id } = input;
      const record = await Organization.findOne({ _id: id, owningUserId: auth.user.id });
      if (!record) throw new Error(`No organization record found for ID ${id}.`);
      return record;
    },

    /**
     *
     */
    allOrganizations: (root, { pagination, sort }, { auth }) => {
      auth.check();
      const criteria = { owningUserId: auth.user.id };
      return new Pagination(Organization, { pagination, sort, criteria });
    },
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
