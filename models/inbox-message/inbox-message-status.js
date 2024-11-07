const ENUM = require("../../libs/enum");

class InboxMessageStatus extends ENUM {
  static ENUM = {
    RECEIVED: "RECEIVED",
    READ: "READ",
    EXECUTED: "EXECUTED",
    FAILED: "FAILED",
  };
}

exports.inboxMessageStatus = InboxMessageStatus;
