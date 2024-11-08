const { VerificationLogs } = require("../models");
const BaseRepository = require("./base-repository");

class VerificationLogsRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new VerificationLogsRepository({
  model: VerificationLogs,
});
