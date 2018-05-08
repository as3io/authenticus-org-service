const { Router } = require('express');
const { noCache } = require('helmet');
const bodyParser = require('body-parser');
const loadOrgRoute = require('./org');
const loadCoreRoute = require('./core');

const router = Router();

router.use(noCache());
router.use(bodyParser.json());

loadOrgRoute(router);
loadCoreRoute(router);

module.exports = router;
