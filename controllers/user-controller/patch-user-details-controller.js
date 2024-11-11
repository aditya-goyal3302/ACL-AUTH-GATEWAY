const { SUCCESS, NO_CONTENT } = require("../../libs/constants");
const { user_service } = require("../../services");
const UserController = require("./user-controller");

class PatchUserDetails extends UserController {
  execute = async (req) => {
    const response = await user_service.patch_user_details(req.body);
    if (!response) return [null, NO_CONTENT];
    return [null, SUCCESS];
  };
}

module.exports = PatchUserDetails;
