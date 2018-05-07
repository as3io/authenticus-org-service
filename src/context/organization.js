const Organization = require('../models/organization');

class OrganizationContext {
  /**
   * @param {string} id The organization ID.
   */
  constructor(id) {
    this.id = id;
  }

  /**
   *
   */
  async load() {
    const { id } = this;
    if (!id) throw new Error('No organization ID was provided.');
    const org = await Organization.findOne({ _id: id }, { _id: 1, owningUserId: 1 });
    if (!org) throw new Error(`No organization found for ID '${id}'`);
    return org;
  }
}

module.exports = OrganizationContext;
