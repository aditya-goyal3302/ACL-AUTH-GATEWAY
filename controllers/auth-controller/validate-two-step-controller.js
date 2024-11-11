const AuthController = require("./auth-controller");
const { auth_service } = require("../../services");

class ValidateTwoStepAuthController extends AuthController {
  execute = async (req) => {
    const result = await auth_service.verify_login(req.body);
    return [result, SUCCESS];
  };
}

module.exports = ValidateTwoStepAuthController;
