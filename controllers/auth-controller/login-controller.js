const AuthController = require("./auth-controller");
const { auth_service } = require("../../services");
const { SUCCESS } = require("../../libs/constants");

class LoginController extends AuthController {
  execute = async (req) => {
    const result = await auth_service.login(req.body);
    if (!result?.token) {
      return [{ message: "OTP Sent Successfully" }, SUCCESS];
    }
    return [result, SUCCESS];
  };
}

module.exports = LoginController;
