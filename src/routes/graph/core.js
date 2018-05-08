const { graphqlExpress } = require('apollo-server-express');
const schema = require('../../graph/schema');
const OrganizationContext = require('../../context/organization');

module.exports = (router) => {
  router.use(
    '/',
    graphqlExpress((req) => {
      const organization = new OrganizationContext(req.get('X-Organization-ID'));
      const context = { organization };
      return { schema, context };
    }),
  );
};
