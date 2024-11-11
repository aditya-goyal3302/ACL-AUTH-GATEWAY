const { SUCCESS } = require("../../libs/constants");
const { user_service } = require("../../services");
const UserController = require("./user-controller");

class RemoveUserImages extends UserController {
  execute = async (req) => {
    const response = await user_service.delete_user_image(req);
    return [response, SUCCESS];
  };
}

module.exports = RemoveUserImages;
