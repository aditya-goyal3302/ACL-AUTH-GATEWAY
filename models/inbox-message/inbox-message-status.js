const ENUM = require("../common/enum");

class InboxMessageStatus extends ENUM {
  static ENUM = {
    RECEIVED: "RECEIVED",
    READ: "READ",
    EXECUTED: "EXECUTED",
    FAILED: "FAILED",
  };
}

exports.inboxMessageStatus = InboxMessageStatus;
