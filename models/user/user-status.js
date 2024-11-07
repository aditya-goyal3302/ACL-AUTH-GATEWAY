const ENUM = require("../../libs/enum");

class UserStatus extends ENUM {
  static ENUM = {
      ACTIVE: "ACTIVE",
      INACTIVE: "INACTIVE",
      BLOCKED: "BLOCKED",
    }
};

exports.userStatus = UserStatus