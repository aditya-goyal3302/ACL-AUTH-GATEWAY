const AuthController = require("./auth-controller");
const { auth_service } = require("../../services");

class ResetPasswordController extends AuthController {
  execute = async (req) => {
    const result = await auth_service.reset_password(req.body, req.params);
    return [result, SUCCESS];
  };
}

module.exports = ResetPasswordController;
