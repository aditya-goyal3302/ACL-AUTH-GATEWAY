const { SUCCESS } = require("../../libs/constants");
const { user_service } = require("../../services");
const UserController = require("./user-controller");

class SetUserImages extends UserController {
  execute = async (req) => {
    const response = await user_service.set_user_image(req);
    return [response, SUCCESS];
  };
}

module.exports = SetUserImages;
