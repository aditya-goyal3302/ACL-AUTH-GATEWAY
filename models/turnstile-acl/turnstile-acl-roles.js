const ENUM = require("../../libs/enum");

class TurnstileAclRoles extends ENUM {
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

exports.turnstileAclRoles = new TurnstileAclRoles();
