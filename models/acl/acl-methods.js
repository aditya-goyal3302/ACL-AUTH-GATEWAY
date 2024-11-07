const ENUM = require("../../libs/enum");

class AclMethods extends ENUM {
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

exports.aclMethods = new AclMethods();
