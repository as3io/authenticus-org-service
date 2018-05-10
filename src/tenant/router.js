const Promise = require('bluebird');
const { Router } = require('express');
const Tenant = require('../core/models/tenant');

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

router.get('/', loadTenant, (req, res) => {
  res.send(req.tenant);
});

module.exports = router;
