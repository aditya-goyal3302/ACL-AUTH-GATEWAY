const ENUM = require("../../libs/enum");

class UserStatus extends ENUM {
  constructor() {
    super({
      ACTIVE: "ACTIVE",
      INACTIVE: "INACTIVE",
      BLOCKED: "BLOCKED",
    });
  }
};

exports.userStatus = new UserStatus()