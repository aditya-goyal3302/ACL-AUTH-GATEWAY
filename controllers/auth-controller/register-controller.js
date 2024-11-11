const AuthController = require("./auth-controller");
const { auth_service } = require("../../services");
const { CREATED } = require("../../libs/constants");

class RegisterController extends AuthController {
  execute = async (req) => {
    const result = await auth_service.signup(req.body);
    return [result, CREATED];
  };
}

module.exports = RegisterController;
