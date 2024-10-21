const ENUM = require("../../libs/enum");

class VerificationLogType extends ENUM {
  constructor() {
    super({
      OTP: "OTP",
      TOKEN: "TOKEN",
    });
  }
}

exports.verificationLogType = new VerificationLogType();
