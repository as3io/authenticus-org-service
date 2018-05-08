module.exports = (router) => {
  router.use('/:orgId([A-Za-z0-9-_]{20})', (req, res) => {
    const { orgId } = req.params;
    res.send({ orgId });
  });
};
