const Promise = require('bluebird');
const { Router } = require('express');
const { noCache } = require('helmet');
const bodyParser = require('body-parser');
const { graphqlExpress } = require('apollo-server-express');
const schema = require('./graph/schema');
const Tenant = require('../core/models/tenant');
const TenantAuth = require('../common/context/tenant-auth');
const authenticate = require('../common/middlewares/authenticate');

const { assign } = Object;
const handleAsync = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const router = Router({ mergeParams: true });

const loadTenant = handleAsync(async (req, res, next) => {
  const { tenantId } = req.params;
  if (!tenantId) throw new Error('No tenant ID was provided with the request.');
  const tenant = await Tenant.findOne({ _id: tenantId });
  if (!tenant) throw new Error('No tenant found for the provided ID.');
  assign(req, { tenant });
  next();
});

router.use(
  noCache(),
  bodyParser.json(),
  authenticate,
  loadTenant,
  graphqlExpress((req) => {
    const { tenant, auth } = req;
    const tenantAuth = TenantAuth({ tenant, auth });
    const context = { tenantAuth };
    return { schema, context };
  }),
);

module.exports = router;
