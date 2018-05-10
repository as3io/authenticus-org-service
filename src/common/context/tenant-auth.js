const TenantUser = require('../../core/models/tenant-user');

const TenantAuth = ({ tenant, auth }) => Object.freeze({
  get tenant() {
    return tenant;
  },

  get auth() {
    return auth;
  },

  async check(role) {
    this.auth.check();
    const isUser = await this.isUser(role);
    if (!isUser) throw new Error('You do not have permission to access this tenant.');
    return true;
  },

  async isUser(role) {
    const criteria = {
      userId: this.auth.user.id,
      tenantId: this.tenant.id,
    };
    if (role) criteria.role = role;
    const count = await TenantUser.count(criteria);
    if (count) return true;
    return false;
  },
});

module.exports = TenantAuth;
