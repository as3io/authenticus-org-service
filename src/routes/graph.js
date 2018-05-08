const { Router } = require('express');
const bodyParser = require('body-parser');
const { noCache } = require('helmet');
const { graphqlExpress } = require('apollo-server-express');
const schema = require('../graph/schema');
const OrganizationContext = require('../context/organization');

const router = Router();

router.use('/:orgId([A-Za-z0-9-_]{20})', noCache(), bodyParser.json(), (req, res) => {
  const { orgId } = req.params;
  res.send({ orgId });
});

router.use(
  '/',
  noCache(),
  bodyParser.json(),
  graphqlExpress((req) => {
    const organization = new OrganizationContext(req.get('X-Organization-ID'));
    const context = { organization };
    return { schema, context };
  }),
);

module.exports = router;
