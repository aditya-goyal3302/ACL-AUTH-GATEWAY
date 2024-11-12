const { VerificationLogs } = require("../models");
const BaseRepository = require("./base-repository");

class VerificationLogsRepository extends BaseRepository {
  constructor() {
    super({ model: VerificationLogs });
  }
}

module.exports = VerificationLogsRepository;
