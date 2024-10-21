const ENUM = require("../../libs/enum");

class TurnstileAclMethods extends ENUM {
  constructor() {
    super({
      GET: "GET",
      POST: "POST",
      PUT: "PUT",
      DELETE: "DELETE",
      PATCH: "PATCH",
    });
  }
}

exports.turnstileAclMethods = new TurnstileAclMethods();
