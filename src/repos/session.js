const jwt = require('jsonwebtoken');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');
const bcrypt = require('bcrypt');
const redis = require('../redis');

class Session {
  /**
   * @param {object} params
   * @param {?string} appId The application identifier, or undefined if global.
   * @param {string} namespace The session namespace.
   * @param {string} secret The session secret.
   * @param {number} [expires=3600] The expiration time, in seconds, of the issued session.
   */
  constructor({
    appId,
    namespace,
    secret,
    expires = 3600,
  } = {}) {
    this.appId = appId || undefined;
    this.expires = expires;

    if (!namespace || !secret) throw new Error('Both a session namespace and secret must be provided.');
    this.namespace = namespace;
    this.secret = secret;
  }

  /**
   * @param {string} token The session JWT token.
   */
  async get(token) {
    if (!token) throw new Error('Unable to get session: no token was provided.');
    const parsed = await jwt.decode(token, { complete: true, force: true });
    if (!parsed) throw new Error('Unable to get session: invalid token format.');
    const result = await redis.getAsync(this.prefixSessionId(parsed.payload.jti));

    if (!result) throw new Error('Unable to get session: no token found in storage.');

    const session = Object(JSON.parse(result));
    const { uid, ts, s } = session;

    const sid = this.createSessionId(uid, ts);
    const secret = this.createSecret(s);
    const verified = jwt.verify(token, secret, { jwtid: sid, algorithms: ['HS256'] });

    // Return the public session.
    return {
      id: sid,
      uid: session.uid,
      app: verified.sub,
      cre: verified.iat,
      exp: verified.exp,
      token,
    };
  }

  /**
   * @param {string} uid The user ID.
   */
  async set(uid) {
    if (!uid) throw new Error('The user ID is required.');
    // @todo Need to ensure the user has access to the application.

    const now = new Date();
    const iat = Math.floor(now.valueOf() / 1000);

    const userSecret = await bcrypt.hash(uuidv4(), 5);

    const ts = now.valueOf();
    const sid = this.createSessionId(uid, ts);
    const exp = iat + this.expires;
    const secret = this.createSecret(userSecret);

    const token = jwt.sign({
      jti: sid,
      exp,
      iat,
      sub: this.appId,
    }, secret);

    await redis.setexAsync(this.prefixSessionId(sid), this.expires, JSON.stringify({
      id: sid,
      ts,
      uid,
      s: userSecret,
    }));

    const memberKey = this.prefixUserId(uid);
    const addUserId = redis.saddAsync(memberKey, sid);
    const updateExpires = redis.expireAsync(memberKey, this.expires);
    await Promise.join(addUserId, updateExpires);

    // Return the public session.
    return {
      id: sid,
      uid,
      app: this.appId,
      cre: iat,
      exp,
      token,
    };
  }

  /**
   * @param {object} params
   * @param {string} params.id The session ID.
   * @param {string} params.uid The user ID.
   */
  delete({ id, uid }) {
    const delSession = redis.delAsync(this.prefixSessionId(id));
    const removeId = redis.sremAsync(this.prefixUserId(uid), id);
    return Promise.join(delSession, removeId);
  }

  /**
   * @private
   * @param {string} uid
   * @param {number} timestamp
   */
  createSessionId(uid, timestamp) {
    return uuidv5(`${uid}.${timestamp}`, this.namespace);
  }

  /**
   * @private
   * @param {string} userSecret
   */
  createSecret(userSecret) {
    return `${userSecret}.${this.secret}`;
  }

  /**
   * @private
   * @param {string} uid
   */
  prefixUserId(uid) {
    return `${this.getRootPrefix()}session:uid:${uid}`;
  }

  /**
   * @private
   * @param {string} id
   */
  prefixSessionId(id) {
    return `${this.getRootPrefix()}session:id:${id}`;
  }

  /**
   * @private
   */
  getRootPrefix() {
    const { appId } = this;
    return appId ? `${appId}:` : '';
  }
}

module.exports = Session;
