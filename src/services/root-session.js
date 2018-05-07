const Session = require('../repos/session');

const { ROOT_SESSION_NAMESPACE, ROOT_SESSION_SECRET, ROOT_SESSION_EXPIRES } = process.env;

const rootSession = new Session({
  namespace: ROOT_SESSION_NAMESPACE,
  secret: ROOT_SESSION_SECRET,
  expires: ROOT_SESSION_EXPIRES,
});

module.exports = rootSession;
