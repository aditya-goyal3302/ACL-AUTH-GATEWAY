const ENUM = require("../../libs/enum");

class VerificationLogType extends ENUM {
  static ENUM = {
    OTP: "OTP",
    TOKEN: "TOKEN",
  };
}

exports.verificationLogType = VerificationLogType
