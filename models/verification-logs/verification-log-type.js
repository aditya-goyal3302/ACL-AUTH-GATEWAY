const ENUM = require("../common/enum");

class VerificationLogType extends ENUM {
  static ENUM = {
    OTP: "OTP",
    TOKEN: "TOKEN",
  };
}

exports.verificationLogType = VerificationLogType
