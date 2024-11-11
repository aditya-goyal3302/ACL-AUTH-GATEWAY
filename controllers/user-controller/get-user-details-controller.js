const { SUCCESS, NO_CONTENT } = require("../../libs/constants");
const { user_service } = require("../../services");
const UserController = require("./user-controller");

class GetUserDetails extends UserController {
  execute = async (req) => {
    const response = await user_service.get_user_data(req);
    if (!response) return [null, NO_CONTENT];
    return [response, SUCCESS];
  };
}

module.exports = GetUserDetails;
