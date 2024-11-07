const ENUM = require("../../libs/enum");

class AclRoles extends ENUM {
  constructor() {
    super({
      EVENT_ORGANIZER: "EVENT_ORGANIZER",
      EVENT_MANAGER: "EVENT_MANAGER",
      VENUE_OWNER: "VENUE_OWNER",
      VENUE_MANAGER: "VENUE_MANAGER",
      CUSTOMER: "CUSTOMER",
      CUSTOMER_SERVICE: "CUSTOMER_SERVICE",
      APPROVER: "APPROVER",
    });
  }
}

exports.aclRoles = new AclRoles();
