const AuthController = require("./auth-controller");
const { auth_service } = require("../../services");
const { SUCCESS } = require("../../libs/constants");

class ChangePasswordController extends AuthController {
  execute = async (req) => {
    const result = await auth_service.change_password(req.body);
    return [result, SUCCESS];
  };
}

module.exports = ChangePasswordController;
