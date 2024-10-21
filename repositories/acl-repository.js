const BaseRepository = require("./base-repository");
const { Acl } = require("../models");

class AclRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new AclRepository({
  model: Acl,
});
