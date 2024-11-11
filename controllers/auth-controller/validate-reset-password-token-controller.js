const AuthController = require("./auth-controller");
const { auth_service } = require("../../services");

class ValidateResetPasswordTokenController extends AuthController {
  execute = async (req) => {
    const result = await auth_service.verify_reset_token(req.params);
    return [result, SUCCESS];
  };
}

module.exports = ValidateResetPasswordTokenController;
